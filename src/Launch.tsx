import FHIR from "fhirclient"

const Launch = () => {

        FHIR.oauth2.authorize({
                "iss": "https://api.dips.no/fhir",
                "redirectUri": "/app",
                "client_id": "hello-open-dips-app",
                "scope": "openid dips-fhir-r4 fhirUser patient/*.read offline_access",
                "launch": "cdp1000807"
        });

        return null;
}

export default Launch; 
