import { useEffect } from "react";
import styles from "./PublicJournalEntryModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { CgProfile } from "react-icons/cg";
import { reviewType } from "../../types/JournalType";

type JournalEntryModalProps = {
    review: reviewType;
    onClose: () => void;
};

const PublicJournalEntryModal = ({ review, onClose }: JournalEntryModalProps) => {
    // Close modal on "Escape" key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <aside
            className={styles.modalBackdrop}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`review-title-${review.title}`}
            aria-describedby={`review-text-${review.text}`}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} tabIndex={-1}>
                {/* Review title, date and close button */}
                <header>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
                        &times;
                    </button>
                    <h3 id={`review-title-${review.title}`} className={styles.modalTitle}>
                        {review.title}
                    </h3>
                    <p className={styles.modalDate} aria-label={`Date range: ${review.date}`}>
                        {review.date}
                    </p>
                </header>

                {/* Review and reviewer info */}
                <section className={styles.modalInfo} aria-labelledby="modal-rating modal-reviewer">
                    <p
                        id="modal-rating"
                        className={styles.modalRating}
                        aria-label={`Rating: ${review.rating} out of 5 stars`}>
                        <FontAwesomeIcon icon={faStar} className={styles.starIcon} aria-hidden="true" />
                        {review.rating}/5
                    </p>
                    <p id="modal-reviewer" className={styles.modalReviewer} aria-label="Reviewer: Ola Nordmann">
                        <CgProfile className={styles.profileIcon} aria-hidden="true" />
                        Ola Nordmann
                    </p>
                </section>
                {/* Review text */}
                <article id={`review-text-${review.title}`} className={styles.modalText}>
                    {review.text}
                </article>
            </div>
        </aside>
    );
};

export default PublicJournalEntryModal;
