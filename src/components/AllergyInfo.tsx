import { R4 } from "@ahryman40k/ts-fhir-types";
import styles from "../styles/patientView.module.scss";

interface AllergyInfoProps {
  allergies: R4.IAllergyIntolerance[];
}

const AllergyInfo: React.FC<AllergyInfoProps> = ({ allergies }) => (
  <div className={styles.section}>
    <h2>Allergy Information</h2>
    {allergies.length > 0 ? (
      allergies.map(allergy => (
        <ul key={allergy.id}>
          <p><strong>ID:</strong> {allergy.id}</p>
          <p><strong>Clinical Status:</strong> {allergy.clinicalStatus?.coding?.[0].display}</p>
          <p><strong>Criticality:</strong> {allergy.criticality}</p>
          <p><strong>Reaction:</strong> {allergy.reaction?.[0].severity}</p>
        </ul>
      ))
    ) : (
      <p>No allergies found.</p>
    )}
  </div>
);

export default AllergyInfo;
