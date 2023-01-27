import FHIR from "fhirclient"
import { useSearchParams } from 'react-router-dom';
import patientIdContext from "../patientIdContext";
import { useState } from 'react';

const Launch: React.FC = () => {
	const [searchParams] = useSearchParams();

	// Let user specify issuer (iss) in query param
	let iss = searchParams.get("iss")
	if (!iss) {
		iss = "https://api.dips.no/fhir"
	}


	const [launch, setLaunch] = useState<string>("");
	const l = searchParams.get("launch") || ""
	setLaunch(l);

	FHIR.oauth2.authorize({
		iss: iss,
		redirectUri: "/app",
		client_id: "hello-open-dips-app",
		scope: "openid dips-fhir-r4 fhirUser patient/*.read offline_access",
		launch: launch,
		completeInTarget: false,
		target: "popup",
		width: 600,
		height: 600

	}).
		then((response) => {
		}).catch((error) => {
			console.error("Failed to fetch FHIR Metadata page and SMART configuration from " + iss + "/Metadata");
		});

	return null;
}

export default Launch;