import { useState } from "react";
import { Link } from "react-router-dom";



const ChoosePatient: React.FC = () => {

    const [patientId, setPatientId] = useState<string>("");


    return (
        <div className="choosePatientWrapper">
            <div className="inputDialog">
                <input type="text" onChange={e => setPatientId(e.target.value)} />
                <button><Link to={`/patient/${patientId}`}>Search</Link></button>
            </div>
        </div>
    )



}

export default ChoosePatient;