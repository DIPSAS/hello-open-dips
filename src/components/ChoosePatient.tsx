import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import FHIR from "fhirclient"
import clientContext from "../context/clientContext";



const ChoosePatient: React.FC = () => {

    const [patientId, setPatientId] = useState<string>("");
    const {client, setClient} = useContext(clientContext);

    useEffect(() => {
		FHIR.oauth2
			.ready()
			.then((client) => {setClient(client)})
			.catch(console.error);
	}, []);



    return (
        <div className="choosePatientWrapper">
            <div className="inputDialog">
                <div className="inputField">
                    <label className="inputLabel">Search for a patient ID or SSN <br/>(eg. cdp1000807 or 13116900216)</label>
                    <input type="text" onChange={e => setPatientId(e.target.value)} />
                </div>
                <button className="dipsPrimaryButton"><Link className="buttonLink" to={`/patient/${patientId}`}>Search</Link></button>
            </div>
        </div>
    )



}

export default ChoosePatient;