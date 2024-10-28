import {useState} from "react";
import {reviewType} from "../../types/JournalType"; // Use reviewType from JournalTypes
import styles from "./PublicJournalEntry.module.css"; // Use CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Import faStar icon
import {CgProfile} from "react-icons/cg";


type PublicJournalEntryProps = {
    review: reviewType;
};

const PublicJournalEntry = ({review}: PublicJournalEntryProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const truncatedText = review.text.length > 100 ? review.text.slice(0, 100) + "..." : review.text;

    return (
        <div className={styles.reviewCard}>
            <h3 className={styles.reviewTitle}>{review.title}</h3>
            <p className={styles.reviewDate}>{review.date}</p>
            <section className={styles.reviewInfo}>
                <p className={styles.reviewRating}>
                    <FontAwesomeIcon icon={faStar} className={styles.starIcon} />{review.rating}/5
                </p>
                <p className={styles.reviewer}>
                    <CgProfile className={styles.profileIcon}/>
                    Ola Nordmann
                </p>
            </section>
            <p className={styles.reviewText}>{isExpanded ? review.text : truncatedText}</p>
                {review.text.length > 100 && (
                    <button className={styles.readMoreButton} onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? "Read Less" : "Read More"}
                    </button>
                )}
        </div>
    );
};

export default PublicJournalEntry;
