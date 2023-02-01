import { useContext, useEffect, useState } from "react";
import { R4 } from "@ahryman40k/ts-fhir-types";
import { Link, useParams } from "react-router-dom";
import clientContext from "../context/clientContext";

const Patient: React.FC = () => {
  const [patient, setPatient] = useState<R4.IPatient | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [documents, setDocuments] = useState<R4.IBundle | undefined>();
  const [error, setError] = useState<string | undefined>(undefined);

  const { id } = useParams();

  const { client } = useContext(clientContext);

  useEffect(() => {
    if (client) {
      setLoading(true);
      async function fetchPatient() {
        await client.request({
          url: `/Patient/${id}`,
          headers: {
            "dips-subscription-key": import.meta.env.VITE_DIPS_SUBSCRIPTION_KEY,
          },
        })
          .then((patient) => {
            setLoading(false);
            setPatient(patient);
          })
          .catch((error) => {
            setLoading(false);
            setError(error);
            console.error;
          });
      }

      fetchPatient();
    }
  }, [client]);

  useEffect(() => {
    if (patient?.id) {
      async function fetchDocuments() {
        await client.request({
          url: `/DocumentReference?patient=${patient?.id}`,
          headers: {
            "dips-subscription-key": import.meta.env.VITE_DIPS_SUBSCRIPTION_KEY,
          },
        })
          .then((documents) => {
            setLoading(false);
            setDocuments(documents);
          })
          .catch((error) => {
            setLoading(false);
            setError(error);
            console.error;
          });
      }
      fetchDocuments();
    }
  }, [patient]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && !patient) {
    return (
      <div className="wrapper">
        <div className="orange-info-card">
          <div className="text-wrapper">
            <p>No patient found with ID: {id}</p>
            <button className="dipsPrimaryButton">
              <Link className="buttonLink" to={`/app`}>
                Return to search
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (patient && documents) {
    return (
      <div className="wrapper">
        <div className="blue-info-card">
          <div className="text-wrapper">
            <i className="person-icon">
            </i>
            <p className="card-name">
              {patient?.name![0].given} {patient?.name![0].family}
            </p>
            <p>
              {patient?.name![0].given} {patient?.name![0].family} is a{" "}
              {patient?.gender!} patient born {patient?.birthDate!}.
            </p>
          </div>
        </div>
        <div className="blue-info-card">
          <div className="text-wrapper">
            <i className="document-icon">
            </i>
            <p className="card-name">Documents</p>
            <p>
              {patient?.name![0].given} {patient?.name![0].family} has{" "}
              {documents?.total ? documents?.total : "0"} documents
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default Patient;