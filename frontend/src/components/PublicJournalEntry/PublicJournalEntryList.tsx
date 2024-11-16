import { JournalTypeRead } from "../../types/JournalType";
import PublicJournalEntry from "./PublicJournalEntry";
import styles from "./PublicJournalEntryList.module.css";

type PublicJournalEntriesProps = {
    journal: JournalTypeRead;
};

const PublicJournalEntryList = ({ journal }: PublicJournalEntriesProps) => {
    const { country, reviews } = journal;

    return (
        <>
            {/* Grid for journal entries */}
            <article
                className={styles.entriesGrid}
                role="list"
                aria-description={`Public journal entries for ${country}`}>
                {reviews.map((review) => (
                    <div key={review.title} role="listitem">
                        <PublicJournalEntry review={review} />
                    </div>
                ))}
            </article>
        </>
    );
};

export default PublicJournalEntryList;
