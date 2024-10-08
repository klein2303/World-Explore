import { JournalType } from "../../types/JournalType";
import styles from "./ReviewBox.module.css"
import { CiStar } from "react-icons/ci";

interface review{
    jounalReviews: JournalType;
    
}

const ReviewBox = ({jounalReviews}: review) => {
    return(
        <>
            <section className= {styles.container}>
                <article className= {styles.reviewBox} ></article>
                <section className={styles.starsContainer}>
                    <CiStar className={styles.star} />
                    <CiStar className={styles.star} />
                    <CiStar className={styles.star} />
                    <CiStar className={styles.star} />
                    <CiStar className={styles.star} />
                </section>
            </section>
        </>
    );
};

export default ReviewBox;