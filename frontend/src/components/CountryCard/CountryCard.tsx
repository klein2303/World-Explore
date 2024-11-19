import { useState } from "react";
import styles from "./CountryCard.module.css";
import { SlPencil } from "react-icons/sl";
import { Link } from "react-router-dom";
import { JournalTypeWrite } from "../../types/JournalType";
import JournalEntryModal from "../JournalEntryModal/JournalEntryModal";

interface CountryCardProps {
    name: string;
    image: string;
}

const CountryCard = ({ name, image }: CountryCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state

    // Function to handle modal open/close
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Function to handle journal entry submission
    const handleJournalSubmit = async (entry: JournalTypeWrite) => {
        console.log("New journal entry submitted:", entry);
        closeModal(); // Close the modal
    };

    // Handle keydown event to check for Enter key
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("funker");
            openModal();
        }
    };

    return (
        <main className={styles.cardcontainer} role="region" aria-label={`country-name-${name}`}>
            <Link to={`/${name}`}>
                <img src={image} alt={`image of the country ${name}`} className={styles.cardimage} aria-hidden="true" />
            </Link>
            <div className={styles.information} role="group" aria-description={`Information and actions for ${name}`}>
                <p id={`country-name-${name}`} className={styles.name}>
                    {name}
                </p>
                <SlPencil
                    className={styles.icon}
                    role="button"
                    onClick={openModal}
                    onKeyDown={handleKeyDown}
                    aria-description={`Write review for ${name}`}
                    tabIndex={0}
                />
                <JournalEntryModal
                    country={name}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleJournalSubmit}
                />
            </div>
        </main>
    );
};

export default CountryCard;
