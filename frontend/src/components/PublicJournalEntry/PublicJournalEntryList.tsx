import {JournalType} from "../../types/JournalType"; // Import JournalType
import PublicJournalEntry from "./PublicJournalEntry"; // Import PublicJournalEntry component
import styles from "./PublicJournalEntryList.module.css"; // Import CSS module

type PublicJournalEntriesProps = {
    journal: JournalType;
};

const PublicJournalEntryList = ({journal}: PublicJournalEntriesProps) => {
    const {reviews} = journal;

    // Filter public reviews
    const publicReviews = reviews.filter((review) => review.public);

    return (
        <>
            {/* Grid for journal entries */}
            <div className={styles.entriesGrid}>
                {publicReviews.map((review) => (
                    <PublicJournalEntry key={review.id} review={review} />
                ))}
            </div>
        </>
    );
};

export default PublicJournalEntryList;
