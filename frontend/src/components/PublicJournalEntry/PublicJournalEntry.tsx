import { useState, useEffect } from "react";
import { reviewType } from "../../types/JournalType";
import styles from "./PublicJournalEntry.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CgProfile } from "react-icons/cg";
import PublicJournalEntryModal from "./PublicJournalEntryModal";

type PublicJournalEntryProps = {
    review: reviewType;
};

const PublicJournalEntry = ({ review }: PublicJournalEntryProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showModal, setShowModal] = useState(false);

    const truncatedText = review.text.length > 100 ? review.text.slice(0, 100) + "..." : review.text;

    // Resize handler to check for screen size
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleReadMore = () => {
        if (isMobile) {
            setIsExpanded(!isExpanded);
        } else {
            setShowModal(true);
        }
    };

    return (
        <>
            <div className={styles.reviewCard}>
                <h3 className={styles.reviewTitle}>{review.title}</h3>
                <p className={styles.reviewDate}>{review.date}</p>
                <section className={styles.reviewInfo}>
                    <p className={styles.reviewRating}>
                        <FontAwesomeIcon icon={faStar} className={styles.starIcon} />{review.rating}/5
                    </p>
                    <p className={styles.reviewer}>
                        <CgProfile className={styles.profileIcon} />
                        Ola Nordmann
                    </p>
                </section>
                <section className={styles.reviewInfoBox}>
                    <p className={styles.reviewText}>{isExpanded || showModal ? review.text : truncatedText}</p>
                    {review.text.length > 100 && (
                        <button className={styles.readMoreButton} onClick={handleReadMore}>
                            {isExpanded ? "Read Less" : "Read More"}
                        </button>
                    )}
                </section>
            </div>
            {showModal && !isMobile && (
                <PublicJournalEntryModal review={review} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};

export default PublicJournalEntry;
