import { useState, useEffect } from "react";
import { R4 } from "@ahryman40k/ts-fhir-types";

const useAppointments = (patientId: string, client: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<R4.IBundle | undefined>(); 

  useEffect(() => {
    if (patientId && client) {
      setLoading(true);
      const fetchAppointments = async () => {
        try {
          const response = await fetch(`/api/appointment/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patientId, client }),
          });
          const data = await response.json();
          setAppointments(data);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    }
  }, [patientId, client]);

  return { appointments, loading };
};

export default useAppointments;