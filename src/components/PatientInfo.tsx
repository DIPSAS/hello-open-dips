import { R4 } from "@ahryman40k/ts-fhir-types";
import styles from "../styles/patientView.module.scss";

interface PatientInfoProps {
  patient: R4.IPatient;
  handleOpenPopup: () => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient, handleOpenPopup }) => (
  <div>
    <div className={styles.section}>
      <h1><strong>Name:</strong> {patient.name?.[0].text}</h1>
      <h2>Personal Information</h2>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Birth Date:</strong> {patient.birthDate}</p>
    </div>

    <div className={styles.section}>
      <h2>Contact Information</h2>
      {patient?.telecom?.map((contact, index) => (
        <p key={index}><strong>{contact.system}:</strong> {contact.value}
        {contact.system === 'phone' && contact.extension?.[0]?.valueDecimal ? ` ---> PhoneID: ${contact.extension[0].valueDecimal}` : ''} </p>
        )) || <p>N/A</p>}
      <button className={styles.button} onClick={handleOpenPopup}>Edit Contact Information</button>
    </div>

    <div className={styles.section}>
      <h2>Address Information</h2>
      <p><strong>Address:</strong> {patient.address?.[0]?.line || 'N/A'}</p>
      <p><strong>City:</strong> {patient.address?.[0]?.city || 'N/A'}</p>
      <p><strong>District:</strong> {patient.address?.[0]?.district || 'N/A'}</p>
      <p><strong>Country:</strong> {patient.address?.[0]?.country || 'N/A'}</p>
    </div>
  </div>
);

export default PatientInfo;
