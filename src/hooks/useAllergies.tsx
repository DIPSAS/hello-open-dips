import { useState, useEffect } from "react";
import { R4 } from "@ahryman40k/ts-fhir-types";

const useAllergies = (patientId: string, client: any) => {
  const [allergies, setAllergies] = useState<R4.IAllergyIntolerance[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (patientId && client) {
      setLoading(true);
      const fetchAllergies = async () => {
        try {
          const response = await fetch(`/api/allergies/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patientId, client }),
          });
          const data = await response.json();
          setAllergies(data.entry.map((entry: { resource: R4.IAllergyIntolerance }) => entry.resource));
        } catch (error) {
          console.error("Error fetching allergies:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAllergies();
    }
  }, [patientId, client]);

  return { allergies, loading };
};

export default useAllergies;
