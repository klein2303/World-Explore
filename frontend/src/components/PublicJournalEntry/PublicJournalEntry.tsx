import { useState, useEffect } from "react";
import { readReviewType } from "../../types/JournalType";
import styles from "./PublicJournalEntry.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PublicJournalEntryModal from "./PublicJournalEntryModal";
import { FaUserPen } from "react-icons/fa6";

type PublicJournalEntryProps = {
    review: readReviewType;
};

const PublicJournalEntry = ({ review }: PublicJournalEntryProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [showModal, setShowModal] = useState<boolean>(false);

    const truncatedText = review.text.length > 200 ? review.text.slice(0, 110) + "..." : review.text;

    // Resize handler to check for screen size
    useEffect(() => {
        const handleResize = () => {
            const mobileView = window.innerWidth <= 768;
            setIsMobile(mobileView);

            // Adjust states based on screen size
            if (mobileView) {
                if (showModal) {
                    // Close modal and expand text when switching to mobile
                    setShowModal(false);
                    setIsExpanded(true);
                }
            } else {
                if (isExpanded) {
                    // Collapse text and show modal when switching to desktop
                    setIsExpanded(false);
                    setShowModal(true);
                }
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [showModal, isExpanded]);

    // Handle Read More / Read Less button click
    const handleReadMore = () => {
        if (isMobile) {
            setIsExpanded(!isExpanded);
        } else {
            setShowModal(true);
        }
    };

    return (
        <>
            <article className={styles.reviewCard} aria-labelledby={`review-title-${review.title}`} role="region">
                {/* Header with title and date */}
                <header>
                    <h3 className={styles.reviewTitle} id={`review-title-${review.title}`}>
                        {review.title}
                    </h3>
                    <p className={styles.reviewDate}>{review.date}</p>
                </header>

                <div className={styles.reviewInfo}>
                    <p className={styles.reviewRating} aria-description={`Rating: ${review.rating} out of 5 stars`}>
                        <FontAwesomeIcon icon={faStar} className={styles.starIcon} aria-hidden="true" />
                        {review.rating}/5
                    </p>
                    <p className={styles.user}>
                        <FaUserPen aria-hidden="true" />
                        {review.journal.profile.username}
                    </p>
                </div>

                {/* Review Text with "Read More" button */}

                <p
                    className={styles.reviewText}
                    aria-expanded={isExpanded || showModal}
                    id={`review-text-${review.title}`}>
                    {isExpanded && isMobile ? review.text : truncatedText}
                </p>
                {review.text.length > 100 && (
                    <button
                        className={styles.readMoreButton}
                        onClick={handleReadMore}
                        aria-controls={`review-text-${review.title}`}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? "Collapse review text" : "Expand review text"}>
                        {isExpanded ? "Read less" : "Read more"}
                    </button>
                )}
            </article>
            {showModal && !isMobile && (
                <PublicJournalEntryModal
                    review={review}
                    onClose={() => setShowModal(false)}
                    aria-labelledby={`review-title-${review.title}`}
                    aria-describedby={`review-text-${review.title}`}
                />
            )}
        </>
    );
};

export default PublicJournalEntry;
