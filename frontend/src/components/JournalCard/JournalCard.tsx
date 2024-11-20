import { useState } from "react";
import styles from "./JournalCard.module.css";
import { Link, useNavigate } from "react-router-dom"; // Importing useNavigate to manually navigate programmatically
import { JournalTypeWrite } from "../../types/JournalType";
import JournalEntryModal from "../JournalEntryModal/JournalEntryModal";

interface JournalCardProps {
    country: string;
    image: string;
}

const JournalCard = ({ country, image }: JournalCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to track modal visibility
    const navigate = useNavigate(); // Hook to manually navigate to another route

    const toggleModal = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent the Link from triggering navigation
        setIsModalOpen(!isModalOpen);
    };

    // Close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Handle journal submission and close the modal afterward
    const handleJournalSubmit = (entry: JournalTypeWrite) => {
        console.log("New Journal Entry:", entry);
        handleCloseModal();
    };

    return (
        <article className={styles.cardWrapper} aria-label={`Journal card wrapper for ${country}`}>
            {/* Link to the journal page if the journal is written (i.e., date exists) */}
            <Link to={`/JournalPage/${country}`} onClick={() => navigate(`/JournalPage/${country}`)}>
                <section className={styles.card} onClick={toggleModal} aria-label={`Journal card for ${country}`}>
                    <div className={styles.verticalStrip} role="presentation"></div>
                    <img src={image} alt={`Image of ${country}`} className={styles.cardImage} />

                    {/* Show appropriate overlay text based on whether a journal entry exists */}
                    <div className={styles.overlayText} role="text">
                        {"Read Journal"}
                    </div>
                </section>
            </Link>

            {/* Display the country name and journal date (if available) */}
            <div className={styles.cardText} role="contentinfo" aria-label={`Journal card text for ${country}`}>
                <header className={styles.cardTitle}>{country}</header>

                {/* Modal for writing a journal entry (only visible when triggered) */}
                {isModalOpen && (
                    <JournalEntryModal
                        country={country}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onSubmit={handleJournalSubmit}
                    />
                )}
            </div>
        </article>
    );
};

export default JournalCard;
