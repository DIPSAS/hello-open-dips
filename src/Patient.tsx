import FHIR from "fhirclient"
import { useEffect, useState, useContext } from 'react'
import { R4 } from "@ahryman40k/ts-fhir-types";
import patientIdContext from "./patientIdContext";

const Patient: React.FC = () => {
	const [patient, setPatient] = useState<R4.IPatient | undefined>();
	const { patientId } = useContext(patientIdContext);


	useEffect(() => {
		FHIR.oauth2
			.ready()
			.then((client) =>
				client.request({
					url: "/Patient/" + patientId,
					headers: { "dips-subscription-key": import.meta.env.VITE_DIPS_SUBSCRIPTION_KEY },
				})
			)
			.then(setPatient)
			.catch(console.error);
	}, []);

	useEffect(() => {
		console.log(patient);
	}, [patient]);



return (
	<>
		<div className="logo"></div>
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