import { useContext, useEffect, useState } from "react";
import { R4 } from "@ahryman40k/ts-fhir-types";
import clientContext from "../../context/clientContext";
import { useRouter } from "next/router";
import styles from '../../styles/appointment.module.scss';
import loadstyles from '../../styles/loading.module.scss';
import { formatDate } from '../../utils'
import usePatientData from "../../hooks/usePatientData";
import useAppointments from "../../hooks/useAppointments";
import useEncounters from "../../hooks/useEncounters";
import Spinner from "../../components/loading";
import AppointmentsEncountersInfo from "../../components/EncAppInfo"; 
import PatientOverview from "../../components/patientOverview";
import Link from "next/link";

const Patient: React.FC = () => {
  const { client } = useContext(clientContext);
  const router = useRouter();
  const patientId = router.query.id as string;

  const { patient, loading: patientLoading } = usePatientData(patientId, client); 
  const { appointments, loading: appointmentsLoading } = useAppointments(patientId, client); 
  const { encounters, loading: encountersLoading } = useEncounters(patientId, client); 
  const [showAppointments, setShowAppointments] = useState<boolean>(false); 
  const [showEncounters, setShowEncounters] = useState<boolean>(false); 

  const handleCardClick = (type: 'appointments' | 'encounters') => {
    if (type === 'appointments') {
      setShowAppointments(true); 
      setShowEncounters(false); 
    } else if (type === 'encounters') {
      setShowAppointments(false); 
      setShowEncounters(true); 
    }
  }; 

  const handleCloseList = () => {
    setShowAppointments(false); 
    setShowEncounters(false); 
  }
  
  if (patientLoading || appointmentsLoading || encountersLoading) {
    return (
      <span className={loadstyles.loader}>
        <Spinner />
      </span>
    );
  }

  const getDisplayFromExtensions = (extensions: R4.IExtension[] | undefined): string => {
    if (!extensions) return 'No details available';
    for (let i = 0; i < extensions.length; i++) {
      const extension = extensions?.[i];
      // console.log(extension);
      if (extension.valueCodeableConcept?.coding) {
        for (let j = 0; j < extension.valueCodeableConcept.coding.length; j++) {
          const coding = extension.valueCodeableConcept?.coding?.[j];
          if (coding.display) {
            return coding.display;
          }
        }
      }
    }
    return 'No details available';
  };

if (!patient) {
  return (
    <div className="wrapper">
      <div className="orange-info-card">
        <div className="text-wrapper">
          <p>No patient found with ID: {patientId}</p>
          <button className="dipsPrimaryButton">
            <Link className="buttonLink" href={`/searchPatient`}>
              Return to search
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

// console.log(appointments?.total)

if(patient && appointments && encounters){

    return (
      <div>
      <div className={styles.goBack}><PatientOverview patientId={patientId}/></div>
      <div className="wrapper">
          <div onClick={() => handleCardClick('appointments')} className="blue-info-card" style={{ cursor: 'pointer'}}>
              <div className="text-wrapper">
                  <i className="appointment-icon"></i>
                  <p className="card-name">Appointments</p>
                  <p>
                      {patient?.name![0].given} {patient?.name![0].family} has{" "}
                      {appointments?.total ? appointments?.total : "0"} appointments
                  </p>
              </div>
            </div>
            <div onClick={() => handleCardClick('encounters')} className="blue-info-card" style={{ cursor: 'pointer'}}>
                <div className="text-wrapper">
                    <i className="encounter-icon"></i>
                    <p className="card-name">Encounters</p>
                    <p>
                        {patient?.name![0].given} {patient?.name![0].family} has{" "}
                        {encounters?.total ? encounters?.total : "0"} encounters 
                    </p>
                </div>
              </div>
          <div>
            {showAppointments && (
              <AppointmentsEncountersInfo title= "Appointments" onClose={handleCloseList}>
                <ul className={styles.appointmentList}>
                  <div> 
                    {appointments?.total && <ul className={styles.appointmentWrapper}>
                      {appointments?.entry?.map((entry) => {
                        const resource = entry.resource as R4.IAppointment;
                        const display = getDisplayFromExtensions(resource.extension); 
                        return (
                        <li key={resource.id}  className={styles.appointmentItem}>
                          <div>
                            <strong>Date: </strong> {formatDate(resource.start)} <br />
                            <strong>Details: </strong> {display}
                          </div>
                        </li>
                      );
                    })}
                    </ul>}
                    {!appointments?.total && <p className="conditions-error">The patient has no appointments.</p>}
                  </div>
                </ul>
              </AppointmentsEncountersInfo>
            )}
          </div>

          <div>
            {showEncounters && (
              <AppointmentsEncountersInfo title="Encounters" onClose={handleCloseList}>
                <ul className={styles.encounterList}>
                <div>
                  {encounters?.total && <ul className={styles.appointmentWrapper}>
                    {encounters?.entry?.map((entry) => {
                      const resource = entry.resource as R4.IEncounter; 
                      return (
                        <li key={resource.id} className={styles.encounterItem}>
                          <div>
                          <strong>Date: </strong>{formatDate(resource.period?.start)} <br />
                          <strong>Details: </strong>{resource.type?.[0].coding?.[0].display} <br />
                          <strong>Reason: </strong>{resource.reasonCode?.[0].text}
                          </div>
                        </li>
                      )
                    })}
                  </ul>}
                  {!encounters?.total && <p className="conditions-error">The patient has no encounters.</p>}
                </div>
                </ul>
              </AppointmentsEncountersInfo>
            )}
          </div>
        </div>
      </div>

	);
	};
}

export default Patient;