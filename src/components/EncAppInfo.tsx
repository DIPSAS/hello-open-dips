// Appointments and Encounters information 

import styles from "../styles/appointment.module.scss"

interface InfoProps {
    title: string; 
    onClose: () => void; 
    children: React.ReactNode;
  }

const AppointmentsEncountersInfo: React.FC<InfoProps> = ({ title, onClose, children }) => {

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  }; 
  
  return (
    <div className={styles.listPopup} onClick={handleClickOutside}>
    <div className={styles.listContent}>
      <div className={styles.listHeader}>
        <h2 className={styles.listTitle}>{title}</h2>
        <button className={styles.closeButton} onClick={onClose}>×</button>
      </div>
      <div className={styles.listBody}>
        {children}
      </div>
    </div>
  </div>
  );
};

export default AppointmentsEncountersInfo; 