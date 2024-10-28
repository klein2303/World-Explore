import { JournalType } from "../../types/JournalType"; // Import JournalType
import PublicJournalEntry from "./PublicJournalEntry"; // Import PublicJournalEntry component
import styles from "./PublicJournalEntryList.module.css"; // Import CSS module

type PublicJournalEntriesProps = {
    journal: JournalType;
};

const PublicJournalEntryList = ({ journal }: PublicJournalEntriesProps) => {
    const { country, reviews } = journal;

    // Filter public reviews
    const publicReviews = reviews.filter((review) => review.public);

    return (
        <>
            {/* Grid for journal entries */}
            <article 
                className={styles.entriesGrid} 
                role="list" 
                aria-label={`Public journal entries for ${country}`}
            >
                {publicReviews.map((review) => (
                    <div key={review.id} role="listitem">
                        <PublicJournalEntry review={review} />
                    </div>
                ))}
            </article>
        </>
    );
};

export default PublicJournalEntryList;
