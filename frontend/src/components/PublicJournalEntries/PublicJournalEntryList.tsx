import {JournalType} from "../../types/JournalType"; // Import JournalType
import PublicJournalEntry from "./PublicJournalEntry"; // Import PublicJournalEntry component
import styles from "./PublicJournalEntryList.module.css"; // Import CSS module

type PublicJournalEntriesProps = {
    journal: JournalType; // Expecting a full JournalType as prop, containing country and reviews
};

const PublicJournalEntries: React.FC<PublicJournalEntriesProps> = ({journal}) => {
    const {country, reviews} = journal; // Destructure country and reviews from journal prop

    // Filter public reviews
    const publicReviews = reviews.filter((review) => review.public);

    if (publicReviews.length === 0) {
        return <p>No public journal entries available for {country}.</p>;
    }

    return (
        <section className={styles.journalContainer}>
            <h3 className={styles.journalTitle}>Public Journal Entries for {country}</h3>
            {/* Display average rating and stars here*/}

            {/* Horizontal line */}
            <div className={styles.horizontalLine}></div>

            <div className={styles.entriesGrid}>
                {publicReviews.map((review) => (
                    <PublicJournalEntry key={review.id} review={review} />
                ))}
            </div>
        </section>
    );
};

export default PublicJournalEntries;
