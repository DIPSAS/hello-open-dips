import { useState, useEffect } from "react";
import { R4 } from "@ahryman40k/ts-fhir-types";

const useRelatedPersons = (patientId: string, client: any) => {
  const [relatedPersons, setRelatedPersons] = useState<R4.IRelatedPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (patientId && client) {
      setLoading(true);
      const fetchRelatedPersons = async () => {
        try {
          const response = await fetch(`/api/relatedperson/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patientId, client }),
          });
          const data = await response.json();
          setRelatedPersons(data.entry.map((entry: { resource: R4.IRelatedPerson }) => entry.resource));
        } catch (error) {
          console.error("Error fetching related persons:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRelatedPersons();
    }
  }, [patientId, client]);

  return { relatedPersons, loading };
};

export default useRelatedPersons;
