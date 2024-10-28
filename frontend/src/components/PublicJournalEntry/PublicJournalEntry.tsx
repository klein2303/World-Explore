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
            <article 
                className={styles.reviewCard} 
                aria-labelledby={`review-title-${review.id}`} 
                role="region"
            >
                {/* Header with title and date */}
                <header>
                    <h3 className={styles.reviewTitle} id={`review-title-${review.id}`}>
                        {review.title}
                    </h3>
                    <p className={styles.reviewDate} aria-label={`Date range: ${review.date}`}>
                        {review.date}
                    </p>
                </header>
                
                {/* Review Information */}
                <div className={styles.reviewInfo} aria-label="Review information">
                    <p className={styles.reviewRating} aria-label={`Rating: ${review.rating} out of 5 stars`}>
                        <FontAwesomeIcon icon={faStar} className={styles.starIcon} aria-hidden="true" />{review.rating}/5
                    </p>
                    <p className={styles.reviewer} aria-label="Reviewer: Ola Nordmann">
                        <CgProfile className={styles.profileIcon} aria-hidden="true" />
                        Ola Nordmann
                    </p>
                </div>

                {/* Review Text with "Read More" button */}
                <div className={styles.reviewInfoBox} aria-label="Review text">
                    <p 
                        className={styles.reviewText} 
                        aria-expanded={isExpanded || showModal}
                        id={`review-text-${review.id}`}
                    >
                        {isExpanded || showModal ? review.text : truncatedText}
                    </p>
                    {review.text.length > 100 && (
                        <footer>
                            <button 
                                className={styles.readMoreButton} 
                                onClick={handleReadMore}
                                aria-controls={`review-text-${review.id}`}
                                aria-expanded={isExpanded}
                                aria-label={isExpanded ? "Collapse review text" : "Expand review text"}
                            >
                                {isExpanded ? "Read Less" : "Read More"}
                            </button>
                        </footer>
                    )}
                </div>
            </article>
            {showModal && !isMobile && (
                <PublicJournalEntryModal 
                    review={review} 
                    onClose={() => setShowModal(false)} 
                    aria-labelledby={`review-title-${review.id}`}
                    aria-describedby={`review-text-${review.id}`}
                />
            )}
        </>
    );
};

export default PublicJournalEntry;
