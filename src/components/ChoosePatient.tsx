import { KeyboardEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clientContext from "../context/clientContext";

const ChoosePatient: React.FC<{ clientLoading: boolean }> = ({ clientLoading }) => {
	const [patientId, setPatientId] = useState<string>("");
	const { client } = useContext(clientContext);
	const navigate = useNavigate();

	const renderPatient = (id: string) => {
		navigate(`/patient/${id}`);
	};

	useEffect(() => {
		if (client?.patient?.id) {
			navigate(`/patient/${client.patient.id}`);
		}
	}, [client]);

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			renderPatient(patientId)
		}
	};

	if (client) {
		return (
			<div className="choosePatientWrapper">
				<div className="inputDialog">
					<div className="inputField">
						<label className="inputLabel">
							Search for a patient ID or SSN{" "}
							<br />(eg. cdp1000807 or 13116900216)
						</label>
						<input type="text"
							onChange={(e) => setPatientId(e.target.value)}
							onKeyDown={(e) => handleKeyDown(e)}
						/>
					</div>
					<button className="dipsPrimaryButton">
						<Link className="buttonLink" to={`/patient/${patientId}`}>
							Search
						</Link>
					</button>
				</div>
			</div>
		);
	}
	else if (!client && !clientLoading) {
		return (
			<div className="orange-info-card">
				<div className="text-wrapper">
					<p>Missing access!</p>
					<p>Please restart the app and allow access to all resources.</p>
					<button className="dipsPrimaryButton">
						<Link className="buttonLink" to={`/`}>
							Restart app
						</Link>
					</button>
				</div>
			</div>
		);
	} else {
		return <></>
	}

};

export default ChoosePatient;