import {Link, useParams} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import {PiArrowElbowDownLeft} from "react-icons/pi";
import styles from "../styles/JournalPage.module.css";
import ReviewBox from "../components/ReviewBox/ReviewBox";
import {SlPencil} from "react-icons/sl";
import {useEffect, useState} from "react";
import JournalEntryModal from "../components/JournalEntryModal/JournalEntryModal"; // Import the modal component
import {JournalType} from "../types/JournalType"; // Import your JournalType

const JournalPage = () => {
    // Get countryName from the URL
    const {countryName} = useParams<{countryName: string}>();

    // Let country be an default string if countryName is empty
    const country = countryName || "";

    // State to manage the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle submission of journal entry
    const handleJournalSubmit = (entry: JournalType) => {
        console.log("New journal entry submitted:", entry);
        // Add your logic here to save the journal entry
        // Then close the modal
        closeModal();
    };

    // Scroll to top when the component mounts
    useEffect(() => {
        window.scrollTo({top: 0});
    }, []);

    return (
        <>
            <Navbar />
            <main className={styles.page} aria-label="Page for reading your journals">
                <Link to={"/MyJournals"} className={styles.returnLink} aria-label="Return to all journals">
                    {" "}
                    <PiArrowElbowDownLeft /> Return to all journals
                </Link>
                <section className={styles.upperSection}>
                    <p className={styles.title}>My {countryName} journals</p>
                    <button className={styles.addButton} aria-label="Add new journal entry" onClick={openModal}>
                        Add new journal entry <SlPencil />
                    </button>
                </section>
                <ReviewBox country={country} />
                {/* Render the JournalEntryModal */}
                <JournalEntryModal
                    country={country}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleJournalSubmit}
                />
            </main>
        </>
    );
};

export default JournalPage;
