import { R4 } from "@ahryman40k/ts-fhir-types";
import styles from "../styles/patientView.module.scss";

interface RelatedPersonsProps {
  relatedPersons: R4.IRelatedPerson[];
  expandedPersonId: string | null;
  handleCardClick: (id: string) => void;
  cardRef: React.RefObject<HTMLDivElement>;
}

const RelatedPersons: React.FC<RelatedPersonsProps> = ({ relatedPersons, expandedPersonId, handleCardClick, cardRef }) => {

  return (
    <div className={styles.section}>
      <h1>Related Persons</h1>
      {relatedPersons.length > 0 ? (
        <ul className={styles.relatedPersonsList}>
          {relatedPersons.map((person) => (
            <li key={person.id}>
              <div
                ref={expandedPersonId === person.id ? cardRef : null}
                className={`${styles.infoCard} ${expandedPersonId === person.id ? styles.expanded : ''}`}
                onClick={() => handleCardClick(person.id as string)}
              >
                <div className="text-wrapper" onClick={(e) => expandedPersonId === person.id && e.stopPropagation()}>
                  <i className="person-icon"></i>
                  <p><strong>Name:</strong> {person.name?.[0].text}</p>
                  <p><strong>Relationship:</strong> {person.relationship?.[0].coding?.[0].display}</p>
                  <p><strong>ID:</strong> {person.identifier?.[0].value}</p>
                  {expandedPersonId === person.id && (
                    <div className={styles.additionalInfo}>
                      {person.telecom?.map((contact, index) => (
                        <p key={index}><strong>{contact.system}:</strong> {contact.value}</p>
                      )) || <p>N/A</p>}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No related persons found.</p>
      )}
    </div>
  );
};

export default RelatedPersons;
