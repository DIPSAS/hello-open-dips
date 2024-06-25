import { useState, useEffect } from "react";
import { R4 } from "@ahryman40k/ts-fhir-types";

const useEncounters = (patientId: string, client: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [encounters, setEncounters] = useState<R4.IBundle | undefined>(); 

  useEffect(() => {
    if (patientId && client) {
      setLoading(true);
      const fetchEncounters = async () => {
        try {
          const response = await fetch(`/api/encounter/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patientId, client }),
          });
          const data = await response.json();
          setEncounters(data);
        } catch (error) {
          console.error("Error fetching encounters:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEncounters();
    }
  }, [patientId, client]);

  return { encounters, loading };
};

export default useEncounters;