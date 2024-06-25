import { R4 } from "@ahryman40k/ts-fhir-types";
import { useContext, useEffect, useState } from "react";
import clientContext from "../context/clientContext";

/**
 * 
 * @param patientId 
 * @returns conditionsBundle <R4.IBundle | Undefined> and loading <boolean>
 * 
 */
const useConditions = (patientId: string) => {
    // States
    const [conditionsBundle, setConditionsBundle] = useState<R4.IBundle | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    // Set context to be clientContext
    const { client } = useContext(clientContext);

    useEffect(() => {
        if (client) {
            setLoading(true);

            // Query API for conditions
            const fetchConditions = async () => {
                const response = await fetch("/api/conditions", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({patientId: patientId, client: client})
                });
                // Get data from API response
                const data = await response.json();
                
                // Set conditions as fetched data if response is OK
                if (response.ok) {
                    setConditionsBundle(data)
                }
                setLoading(false);
            }
            fetchConditions();
        }
    }, [client, patientId])

    return {conditionsBundle, loading};
}
export default useConditions;