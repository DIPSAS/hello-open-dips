import { useState, useEffect } from "react";
import { R4 } from "@ahryman40k/ts-fhir-types";

const usePatientData = (patientId: string, client: any) => {
  const [patient, setPatient] = useState<R4.IPatient | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPatientData = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/patient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId: id, client }),
      });
      const data = await response.json();
      setPatient(data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId && client) {
      fetchPatientData(patientId);
    }
  }, [patientId, client]);

  return { patient, loading, fetchPatientData, setPatient };
};

export default usePatientData;
