import React, { useEffect, useState } from "react";
import FHIR from "fhirclient";
import Client from "fhirclient/lib/Client";

export default function Home() {
    useEffect(() => {
        const fetchLaunch = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                const iss = searchParams.get("iss") || "https://api.dips.no/fhir";
                const launch = searchParams.get("launch") || "";

                await FHIR.oauth2.authorize({
                    iss,
                    redirectUri: window.location.origin + "/searchPatient",
                    client_id: "hello-open-dips-app",
                    scope: "openid dips-fhir-r4 fhirUser patient/*.read offline_access",
                    launch,
                });
            } catch (error) {
                console.error("Failed to fetch FHIR Metadata page and SMART configuration:", error);
            }
        };



        fetchLaunch();
    }, []);

    return null;
}


