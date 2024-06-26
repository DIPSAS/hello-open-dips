import { useContext, useEffect, useState } from "react";
import { R4 } from "@ahryman40k/ts-fhir-types";
import clientContext from "../../context/clientContext";
import { useRouter } from "next/router";
import Link from 'next/link'
import styles from "../../styles/documents.module.scss"
import Spinner from "../../components/loading"
import loadingstyles from "../../styles/loading.module.scss";
import PatientOverview from "../../components/patientOverview";

const Documents: React.FC = () => {
    const [patient, setPatient] = useState<R4.IPatient | undefined>();
    const [documents, setDocuments] = useState<R4.IBundle | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [document, setDocument] = useState();
    const [currentDocumentID, setCurrentDocumentID] = useState<string | undefined>("");
    const [documentLoadError, setDocumentLoadError] = useState(false);

    const { client } = useContext(clientContext);
    const router = useRouter();
    const patientId = router.query.id;

    const fetchPatientData = async (id: string) => {
        const response = await fetch(`/api/patient`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientId: id, client: client })
        });
        const data = await response.json();
        return data;
    };

    const fetchDocumentreferences = async (id: string) => {
        const response = await fetch(`/api/documents`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({patientId: id, client: client})
        });

        const data = await response.json();
        return data;

    };

    const renderDocument = async(id:string) => {
        const response =  await fetch(`/api/binary`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({binaryID: id, client: client})
        });
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        if (patientId && client) {
          setLoading(true);
          fetchPatientData(patientId as string)
            .then(data => {
              setPatient(data);
              setLoading(false);
            })
            .catch(error => {
              console.error("Error fetching patient data:", error);
              setLoading(false);
            });
        }
      }, [patientId, client]);

    useEffect(() => {
        if(patient?.id){
            setLoading(true);
            fetchDocumentreferences(patient?.id)
            .then(data => {
                setDocuments(data);
                if(!currentDocumentID){
                    setCurrentDocumentID(data.entry[0].resource.id);
                }
                setLoading(false);
            })
            .catch(error => {
                    console.error("Error fetching patient documents:", error);
                    setLoading(false);
            })

        }
    }, [patient]);

    useEffect(() => {
        if(currentDocumentID){
            renderDocument(currentDocumentID as string)
                .then(data => {
                    setDocument(data.data);
                    setDocumentLoadError(false);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching a document", error);
                    setDocumentLoadError(true);
                    setLoading(false);
                });
        }
    }, [currentDocumentID, documents]);
    
    if(documents){
        if(documents.entry){
            if(documents.total){

                return (
                    <div className={styles.total}>
                    <div className={styles.goBack}>
                    <PatientOverview patientId={patientId as string}/></div>
                    <div className={styles.metaDataBox}>
                        <div className={styles.metadataPatient}>
                        <p> Patient: {patient?.name![0].given} {patient?.name![0].family}</p> 
                        </div>
                      <div className={styles.metadataSelectFile}>
                            <p>Currently selected file: 
                                <select id="documents" value={currentDocumentID} onChange={(e) => {
                                    setCurrentDocumentID(e.target.value)}}>   
                                {documents.entry.map(entry =>
                                entry.resource?.id?<option className={styles.option}  value={entry.resource?.id} key={entry.resource?.id}> 
                                {entry.resource?.id} 
                                </option>:<></>
                            )}
                                </select>
                            </p>
                        </div>
                    </div>
                    {(loading || !document) && currentDocumentID && !documentLoadError &&
                    <span className={loadingstyles.loader}>
                        <Spinner />
                    </span>}
                    {loading == false && currentDocumentID && !documentLoadError && document &&
                    <div className={styles.documentViewer}>
                        <iframe src={`data:application/pdf;base64,${document}`}/>
                    </div>}
                    {!currentDocumentID && !loading && !documentLoadError && documents.total > 0 &&
                    <div className={styles.documentInfo}>
                    <p>
                        Please select a document 
                    </p>
                    </div>}
                    {!currentDocumentID && !loading && !documentLoadError && documents.total == 0 &&
                    <div className={styles.documentInfo}>
                    <p>
                        There is no documents here
                    </p>
                    </div>}
                    {loading == false && currentDocumentID && documentLoadError &&
                    <div className={styles.documentError}>
                        <p>
                            Error: Could not load the document.
                            If it happens for multiple documents please try to log in again
                            <br></br>
                            <button className={styles.dipsPrimaryButton}>
						    <Link className={styles.buttonLink} href="/">
							    Go home
						    </Link>
					</button>
                        
                        </p>
                        
                    </div>
                    }
                    
                </div>
            )
            }
            else{
                return (
                <div className={styles.total}>
                    <div className={styles.goBack}>
                        <PatientOverview patientId={patientId as string}/>
                    </div>
                    <div className={styles.documentInfo}>
                        <p>
                            There is no documents here
                        </p>
                    </div>
                </div>)
            }
        }
        else{
            return (
            <div className={styles.total}> 
                <div className={styles.goBack}>
                        <PatientOverview patientId={patientId as string}/>
                </div>
                <div className={styles.documentInfo}>
                    <p>
                        Could not get any documents assosiated with the patient
                    </p>
                </div>
            </div>)
        }
        
    }
    else if (!loading){
        return(
            <div className={styles.total}> 
                <div className={styles.goBack}>
                        <PatientOverview patientId={patientId as string}/>
                </div>
                <div className={styles.documentInfo}>
                    <p>
                        Could not find documents related to {patientId}
                    </p>
                </div>
            </div>) 
    }
    else if (loading){
        return (
            <div>
                <PatientOverview patientId={patientId as string}/>
                <span className={loadingstyles.loader}>
                    <Spinner />
                </span>
            </div>
          );
    }

}
export default Documents;