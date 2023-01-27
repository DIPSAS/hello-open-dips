import FHIR from "fhirclient"
import { useContext, useEffect, useState } from 'react'
import { R4 } from "@ahryman40k/ts-fhir-types";
import { useParams } from "react-router-dom";
import clientContext from "../context/clientContext";

const Patient: React.FC = () => {
	const [patient, setPatient] = useState<R4.IPatient | undefined>();
	const [loading, setLoading] = useState<boolean>(false);

	const { id } = useParams();

	const { client } = useContext(clientContext);

	console.log("Client: " + client);

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
					.catch(() => {
						setLoading(false);
						console.error
					});
			}
			fetchPatient();
		}
	}, [client])

	if(loading) {
		return <div>Loading...</div>
	}

	if(!loading && !patient) {
		return <div>Ingen pasient funnet</div>
	}

	return (
		<>
			<div className="wrapper">
				<div className="blue-info-card">
					{patient &&
						<div className="text-wrapper">
							<i className="person-icon">
							</i>
							<p className="card-name">{patient?.name![0].given} {patient?.name![0].family}</p>
							<p>{patient?.name![0].given} {patient?.name![0].family} is a {patient?.gender!} patient born {patient?.birthDate!}. </p>
						</div>
					}
				</div>
			</div>
		</>

	);


};

export default Patient;
