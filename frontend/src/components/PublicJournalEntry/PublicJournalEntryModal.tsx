import styles from "./PublicJournalEntryModal.module.css"; // Create this CSS file for the modal's styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { CgProfile } from "react-icons/cg";
import { reviewType } from "../../types/JournalType";

type JournalEntryModalProps = {
    review: reviewType;
    onClose: () => void;
};

const PublicJournalEntryModal = ({ review, onClose }: JournalEntryModalProps) => {
    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
                    &times;
                </button>
                <h3 className={styles.modalTitle}>{review.title}</h3>
                <p className={styles.modalDate}>{review.date}</p>
                <section className={styles.modalInfo}>
                    <p className={styles.modalRating}>
                        <FontAwesomeIcon icon={faStar} className={styles.starIcon} />
                        {review.rating}/5
                    </p>
                    <p className={styles.modalReviewer}>
                        <CgProfile className={styles.profileIcon} />
                        Ola Nordmann
                    </p>
                </section>
                <p className={styles.modalText}>{review.text}</p>
            </div>
        </div>
    );
};

export default PublicJournalEntryModal;
