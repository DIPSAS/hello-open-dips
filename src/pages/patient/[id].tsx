import { useContext, useEffect, useState } from "react";
import { R4 } from "@ahryman40k/ts-fhir-types";
import clientContext from "../../context/clientContext";
import { useRouter } from "next/router";
import Link from 'next/link'
import BlueInfoCard from "../../components/blueInfoCard";
import Spinner from "../../components/loading"
import styles from "../../styles/loading.module.scss";


const Patient: React.FC = () => {
  const [patient, setPatient] = useState<R4.IPatient | undefined>();
  const [documents, setDocuments] = useState<R4.IBundle | undefined>();
  const [conditions, setConditions] = useState<R4.IBundle | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<R4.IBundle | undefined>(); 
  const [encounters, setEncounters] = useState<R4.IBundle | undefined>(); 



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


  const renderDocuments = async (id: string) => {
	const response = await fetch(`/api/documents`,{
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({patientId: id, client: client})
	});
	
	const data = await response.json();
    return data;
	
};

const renderAppointments = async (id: string) => {
	const response = await fetch(`/api/appointment`,{
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({patientId: id, client: client})
	});
	const data = await response.json();
    return data;
};

const renderConditions = async (id: string) => {
	// Call Conditions API
	const response = await fetch(`/api/conditions`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({patientId: id, client: client})
	});
	const data = await response.json();

	if (!response.ok) throw new Error(`Could not fetch conditions!\n ${response.status} ${response.statusText}`);

	// Return data from response
    return data;

	
};

const renderEncounters = async (id: string) => {
	const response = await fetch(`/api/encounter`,{
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({patientId: id, client: client})
	});

	const data = await response.json();
    return data;

	
};

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
    if (patient?.id) {
      setLoading(true);
      renderDocuments(patient?.id)
        .then(data => {
          setDocuments(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching patient data:", error);
          setLoading(false);
        });
    }
  }, [patient]);



  useEffect(() => {
    if (patient?.id) {
      setLoading(true);
      renderAppointments(patientId as string)
        .then(data => {
          setAppointments(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching patient data:", error);
          setLoading(false);
        });
    }
  }, [patient]);

  useEffect(() => {
    if (patient?.id) {
      setLoading(true);
      renderEncounters(patientId as string)
        .then(data => {
          setEncounters(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching patient data:", error);
          setLoading(false);
        });
    }
  }, [patient]);


//   Fetch conditions
useEffect(() => {
	if (patient) {
		setLoading(true);
		renderConditions(patientId as string)
			.then(data => {
			setConditions(data);
			setLoading(false);
			})
			.catch(error => {
			console.error("Error fetching patient data:", error);
			setLoading(false);
			});
	}
}, [patient])



  
  if (loading) {
    return (
      <span className={styles.loader}>
        <Spinner />
      </span>
    );
  }
	
	if (!loading && !patient) {
		return (
			<div className="wrapper">
			<div className="orange-info-card">
				<div className="text-wrapper">
					<p>No patient found with ID: {patientId}</p>
					<button className="dipsPrimaryButton">
						<Link className="buttonLink" href={`/searchPatient`}>
							Return to search
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
}

if(patient && !loading && documents && appointments && encounters){

		return (
			<div className="wrapper">
				
				<BlueInfoCard
					icon="person-icon"
					title={`${patient?.name![0].given} ${patient?.name![0].family}`}
					info={`${patient?.name![0].given} ${patient?.name![0].family} is a${" "}
							${patient?.gender!} patient born ${patient?.birthDate!}.`}
					link={`/patientView/${patientId}`}
				/>

				<BlueInfoCard 
					icon="document-icon" 
					title="Documents" 
					info={`${patient?.name![0].given} ${patient?.name![0].family} has${" "}
							${documents?.total ? documents?.total : "0"} documents`}
					link={`/documents/${patientId}`}

				/>

				<BlueInfoCard
					icon="condition-icon"
					title="Conditions"
					info={`${patient?.name![0].given} ${patient?.name![0].family} has${" "}
							${conditions?.total ? conditions?.total : 0} conditions`}
					link={`/conditions/${patient?.id}`}
				/>

				<BlueInfoCard
					icon="appointment-icon"
					title="Appointments"
					info={`${patient?.name![0].given} ${patient?.name![0].family} has${" "}
							${appointments?.total} appointments and ${" "}
							${encounters?.total} encounters`}
					link={`/appointments/${patientId}`}
				/>
		</div>
	);
	};
}

export default Patient;
