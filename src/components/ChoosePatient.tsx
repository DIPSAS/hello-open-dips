import { useState } from "react";
import { Link } from "react-router-dom";


import FHIR from "fhirclient"

const ChoosePatient: React.FC = () => {

	const [patientId, setPatientId] = useState<string>("");


	FHIR.oauth2.ready()
		.then(client => {
			let id = client.patient.id || "";
			setPatientId(id)
		})

	return (
		<div className="choosePatientWrapper">
			<div className="inputDialog">
				<input type="text" onChange={e => setPatientId(e.target.value)} placeholder={patientId} />
				<button><Link to={`/patient/${patientId}`}>Search</Link></button>
			</div>
		</div>
	)



}

export default ChoosePatient;