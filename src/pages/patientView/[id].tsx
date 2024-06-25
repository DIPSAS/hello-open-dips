import { useContext, useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import clientContext from "../../context/clientContext";
import PatientInfo from "../../components/PatientInfo";
import AllergyInfo from "../../components/AllergyInfo";
import RelatedPersons from "../../components/RelatedPersons";
import usePatientData from "../../hooks/usePatientData";
import useRelatedPersons from "../../hooks/useRelatedPersons";
import useAllergies from "../../hooks/useAllergies";
import styles from "../../styles/patientView.module.scss";
import Loadstyles from "../../styles/loading.module.scss";
import Spinner from "../../components/loading"
import PatientOverview from "../../components/patientOverview";

const Patient: React.FC = () => {
  const { client } = useContext(clientContext);
  const router = useRouter();
  const patientId = router.query.id as string;

  const { patient, loading: patientLoading, fetchPatientData, setPatient } = usePatientData(patientId, client);
  const { relatedPersons, loading: relatedPersonsLoading } = useRelatedPersons(patientId, client);
  const { allergies, loading: allergiesLoading } = useAllergies(patientId, client);

  const [expandedPersonId, setExpandedPersonId] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [contactFormData, setContactFormData] = useState({ phone: '', email: '', PhoneID: '' });

  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = (id: string) => {
    setExpandedPersonId(expandedPersonId === id ? null : id);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setExpandedPersonId(null);
    }
  };

  const handleOpenPopup = () => {
    setContactFormData({
      phone: '',
      email: patient?.telecom?.find(t => t.system === 'email')?.value || '',
      PhoneID: ''
    });
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/updateContactInfo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        OfficialNumber: patient?.identifier?.[0].value,
        MobileNumber: contactFormData.phone,
        EmailAddress: contactFormData.email,
        PhoneID: contactFormData.PhoneID,
        client: client,
      }),
    });

    if (response.ok) {
      try {
        await fetchPatientData(patientId);
      } catch (error) {
        console.error("Error refreshing patient data:", error);
      } finally {
        setIsPopupOpen(false);
      }
    } else {
      console.error("Error updating contact information");
    }
  };

  useEffect(() => {
    if (expandedPersonId) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedPersonId]);

  if (patientLoading || relatedPersonsLoading || allergiesLoading) {
    return (
      <span className={Loadstyles.loader}>
        <Spinner/>
      </span>
    );
  }

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

  return (
    <div>
      <div className={styles.goBack}>
        <PatientOverview patientId={patientId}/>
      </div>

      <div className={styles.patientWrapper}>
        <PatientInfo patient={patient} handleOpenPopup={handleOpenPopup} />
        <RelatedPersons
          relatedPersons={relatedPersons}
          expandedPersonId={expandedPersonId}
          handleCardClick={handleCardClick}
          cardRef={cardRef}
        />
        {isPopupOpen && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h2>Edit Contact Information</h2>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  placeholder="Phone"
                  value={contactFormData.phone}
                  onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={contactFormData.email}
                  onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                />
                <input
                  type="PhoneID"
                  placeholder="PhoneID"
                  value={contactFormData.PhoneID}
                  onChange={(e) => setContactFormData({ ...contactFormData, PhoneID: e.target.value })}
                />
                <button className={styles.button}>Save</button>
                <button className={styles.button} onClick={handleClosePopup}>Cancel</button>
              </form>
            </div>
          </div>
        )}
        <AllergyInfo allergies={allergies} />
      </div>
    </div>
  );
};

export default Patient;
