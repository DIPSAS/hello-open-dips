import Link from "next/link";
import styles from "../styles/back.module.scss"

interface PatientOverviewProps {
  patientId: string;
}

const PatientOverview: React.FC<PatientOverviewProps> = ({ patientId }) => {
  return (
    <header className={styles.goBack}>
      <Link href={`/patient/${patientId}`}>
        <i className="back-arrow-icon" />
      </Link>
    </header>
  );
};

export default PatientOverview;