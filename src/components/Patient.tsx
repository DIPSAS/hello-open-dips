import FHIR from "fhirclient"
import { useContext, useEffect, useState } from 'react'
import { R4 } from "@ahryman40k/ts-fhir-types";
import { useParams } from "react-router-dom";
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
					headers: { "dips-subscription-key": import.meta.env.VITE_DIPS_SUBSCRIPTION_KEY },
				})
					.then((patient) => {
						setLoading(false);
						setPatient(patient);
					})
					.catch((error) => {
						setLoading(false);
						setError(error);
						console.error
					});
			}
			async function fetchDocuments() {
				await client.request({
					url: `/DocumentReference?patient=${id}`,
					headers: { "dips-subscription-key": import.meta.env.VITE_DIPS_SUBSCRIPTION_KEY },
				})
					.then((documents) => {
						setLoading(false);
						setDocuments(documents);
					})
					.catch((error) => {
						setLoading(false);
						setError(error);
						console.error
					});
			}
			fetchDocuments();
			fetchPatient();
		}
	}, [client])

	console.log("Documents in Patient: " + documents?.total);

	if (loading) {
		return <div>Loading...</div>
	}

	if (!loading && !patient) {
		return (
			<div className="wrapper">
				<div className="blue-info-card">
					<p>No patient found with ID: {id}</p>
				</div>
			</div>);
	}

	return (
		<div className="wrapper">
			<div className="blue-info-card">
				<div className="text-wrapper">
					<i className="person-icon">
					</i>
					<p className="card-name">{patient?.name![0].given} {patient?.name![0].family}</p>
					<p>{patient?.name![0].given} {patient?.name![0].family} is a {patient?.gender!} patient born {patient?.birthDate!}. </p>
				</div>
			</div>

			<div className="blue-info-card">
				<div className="text-wrapper">
					<i className="document-icon">
					</i>
					<p className="card-name">Documents</p>
					<p>{patient?.name![0].given} {patient?.name![0].family} has {documents?.total} documents </p>
				</div>
			</div>
		</div>
	);


};

export default Patient;
