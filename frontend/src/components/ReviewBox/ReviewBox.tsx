import { JournalType } from "../../types/JournalType";
import styles from "./ReviewBox.module.css"
import { CiStar } from "react-icons/ci";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface review{
    jounalReviews: JournalType;
    country: string
}

const ReviewBox = ({jounalReviews, country}: review) => {
    return(
        <>
            <section className= {styles.container} aria-label= "Section containing the journal entry">
                {jounalReviews.reviews
                    .filter((reviewItem) => jounalReviews.country === country) // Filter by the selected country
                    .map((reviewItem) => (
                    <article key={reviewItem.id} className={styles.reviewBox}>
                        <p>{reviewItem.title}</p>
                        <p>{reviewItem.dato}</p>
                        <p>{reviewItem.text}</p>
                        <section className={styles.starsContainer}>
                        {Array(reviewItem.rating)
                            .fill(0)
                            .map((_, i) => (
                            <CiStar key={i} className={styles.star} />
                            ))}
                        </section>
                        <section>
                            <p>Make this journal entry public</p>
                            <MdOutlineCheckBoxOutlineBlank />
                        </section>
                    </article>
                ))}
            </section>
        </>
    );
};

export default ReviewBox;