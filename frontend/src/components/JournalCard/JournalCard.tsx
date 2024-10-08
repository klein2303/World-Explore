import {useState} from "react";
import styles from "./JournalCard.module.css";

interface JournalCardProps {
    country: string;
    date: string | null; // Null if visited, but not journaled
    image: string;
}

const JournalCard = ({country, date, image}: JournalCardProps) => {
    const [isWriting, setIsWriting] = useState<boolean>(false); // To handle modal visibility

    // Function to toggle the modal
    const toggleModal = () => {
        if (!date) {
            // Only toggle the modal if there is no date (not journaled)
            setIsWriting(!isWriting);
        }
    };

    return (
        <article className={styles.cardWrapper} aria-label={`Journal card wrapper for ${country}`}>
            <section className={styles.card} onClick={toggleModal} aria-label={`Journal card for ${country}`}>
                <div className={styles.verticalStrip} role="presentation"></div>
                <img src={image} alt={`Image of ${country}`} className={styles.cardImage} />

                {/* Overlay text */}
                <div className={styles.overlayText} role="text">{date ? "Read Journal" : "Write Journal"}</div>
            </section>
            <div className={styles.cardText} role="contentinfo" aria-label={`Journal card text for ${country}`}>
                <header className={styles.cardTitle}>{country}</header>

                {/* Display the date if the country has a journal entry */}
                {date && <p className={styles.cardDate}>{date}</p>}

                {/* Modal for writing a journal */}
                {isWriting && (
                    <aside className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="journalModalTitle">
                        <div className={styles.modalContent} role="document">
                            <h2 id="journalModalTitle">Write your journal entry for {country}</h2>
                            <textarea
                                placeholder="Start writing..."
                                className={styles.textArea}
                                aria-label="Journal entry text area"></textarea>
                            <button onClick={toggleModal} className={styles.closeButton} aria-label="Close modal">
                                Close
                            </button>
                        </div>
                    </aside>
                )}
            </div>
        </article>
    );
};

export default JournalCard;
