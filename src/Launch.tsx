import FHIR from "fhirclient"
import { useSearchParams } from 'react-router-dom';

const Launch = () => {
	const [searchParams] = useSearchParams();

	// Let user specify issuer (iss) in query param
	let iss = searchParams.get("iss")
	if (!iss) {
		iss = "https://api.dips.no/fhir"
	}

	let launch = searchParams.get("launch")
	if (!launch) {
		launch = "cdp1000807"
	}

	FHIR.oauth2.authorize({
		"iss": iss,
		"redirectUri": "/app",
		"client_id": "hello-open-dips-app",
		"scope": "openid dips-fhir-r4 fhirUser patient/*.read offline_access",
		"launch": launch
	});

	return null;
}

export default Launch;