import React, {useState} from "react";
import styles from "./JournalCard.module.css";

interface JournalCardProps {
    country: string;
    date: string | null; // Null if visited, but not journaled
    image: string;
}

const JournalCard: React.FC<JournalCardProps> = ({country, date, image}) => {
    const [isWriting, setIsWriting] = useState(false); // To handle modal visibility

    // Function to toggle the modal
    const toggleModal = () => {
        if (!date) {
            // Only toggle the modal if there is no date (not journaled)
            setIsWriting(!isWriting);
        }
    };

    return (
        <div className={styles.cardWrapper}>
            <section className={styles.card} onClick={toggleModal} aria-label={`Journal card for ${country}`}>
                <div className={styles.verticalStrip}></div>
                <img src={image} alt={`Image of ${country}`} className={styles.cardImage} />

                {/* Overlay text */}
                <div className={styles.overlayText}>{date ? "Read Journal" : "Write Journal"}</div>
            </section>
            <div className={styles.cardText}>
                <p className={styles.cardTitle}>{country}</p>

                {/* Display the date if the country has a journal entry */}
                {date && <p className={styles.cardDate}>{date}</p>}

                {/* Modal for writing a journal */}
                {isWriting && (
                    <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="journalModalTitle">
                        <div className={styles.modalContent}>
                            <h2 id="journalModalTitle">Write your journal entry for {country}</h2>
                            <textarea
                                placeholder="Start writing..."
                                className={styles.textArea}
                                aria-label="Journal entry text area"></textarea>
                            <button onClick={toggleModal} className={styles.closeButton} aria-label="Close modal">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JournalCard;
