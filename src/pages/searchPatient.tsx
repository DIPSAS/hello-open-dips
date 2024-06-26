import { KeyboardEvent, useContext, useEffect, useState } from "react";
import clientContext from "../context/clientContext";
import { useRouter } from 'next/router'
import styles from '../styles/searchPatient.module.scss';
import Link from "next/link";


const ChoosePatient: React.FC<{ clientLoading: boolean }> = ({ clientLoading }) => {
	const [patientId, setPatientId] = useState<string>("");
	const { client } = useContext(clientContext);
	const navigate = useRouter();


	// Search for active patient if any patient is active
	useEffect(() => {
		if (client?.patient?.id) {
			navigate.push(`/patient/${client.patient.id}`);
		}
	}, [client, navigate]);


	// Search for patient on pressed enter key
	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			navigate.push(`/patient/${patientId}`);
		}
	};

	if (client) {
		return (
			<div className={styles.choosePatientWrapper}>
				<div className={styles.inputDialog}>
					<div className={styles.inputField}>
						<label className={styles.inputLabel}>
							Search for a patient ID or SSN {" "}
							<br />(eg. cdp1000807 or 13116900216)
						</label>
						<input type="text"
							onChange={(e) => setPatientId(e.target.value)}
							onKeyDown={(e) => handleKeyDown(e)}
						/>
					</div>
					<Link href={{ pathname: `/patient/${patientId}`}} className="default-link">
						<button className={styles.dipsPrimaryButton} >
							Submit
						</button>
					</Link>
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
					<Link href={"/"} className="default-link">
						<button className={styles.dipsSecondaryButton}>
							Return to login
						</button>
					</Link>
				</div>
			</div>
		);
	} else {
		return <></>
	}

};

export default ChoosePatient;