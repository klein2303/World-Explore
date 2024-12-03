import styles from "./ReviewBox.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { gql, useQuery } from "@apollo/client";
import { removeQuotes } from "../../utils/utils";
import { PiArrowElbowDownLeft } from "react-icons/pi";
import { Link } from "react-router-dom";

interface journalCountry {
    country: string;
}

const ReviewBox = ({ country }: journalCountry) => {
    const user = removeQuotes(sessionStorage.getItem("user")!);

    const JOURNAL = gql`
        query GetJournal($countryid: String!, $profileid: String!) {
            writtenjournal(countryid: $countryid, profileid: $profileid) {
                id
                reviews {
                    id
                    title
                    date
                    text
                    rating
                    ispublic
                }
            }
        }
    `;
    const { data, loading, error } = useQuery(JOURNAL, {
        variables: { countryid: country, profileid: user },
        fetchPolicy: "cache-and-network",
    });
    // Render 5 stars based on a given rating
    const renderStars = (rating: number) => {
        const maxStars = 5;
        return Array.from({ length: maxStars }, (_, index) =>
            index < rating ? (
                <FaStar key={index} className={styles.starFilled} aria-label="filled star" />
            ) : (
                <FaRegStar key={index} className={styles.starNotFilled} aria-label="empty star" />
            ),
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <main className="main">
            {data.writtenjournal ? (
                <>
                    <section>
                        <Link to={"/MyJournals"} className={styles.returnLink}>
                            {" "}
                            <PiArrowElbowDownLeft /> Return to all journals
                        </Link>
                        <section className={styles.upperSection}>
                            <p className={styles.title} aria-label="journals">
                                My {country} journals
                            </p>
                        </section>
                    </section>
                    {data.writtenjournal.reviews.map(
                        (review: {
                            id: number;
                            title: string;
                            date: string;
                            text: string;
                            rating: number;
                            ispublic: boolean;
                        }) => (
                            <section
                                key={review.id}
                                className={styles.reviewBox}
                                aria-description="Section containing the journal entry"
                                tabIndex={0}>
                                <p className={styles.reviewTitle}>{review.title}</p>
                                <p className={styles.date}>{review.date}</p>
                                <article className={styles.reviewText}>{review.text} </article>
                                <section className={styles.starsContainer} aria-label="rating">
                                    {/* Render stars based on rating */}
                                    {renderStars(review.rating)}
                                </section>
                                <p className={styles.publicInfoText}>
                                    This journal entry is {review.ispublic ? "public" : "private"}
                                </p>
                            </section>
                        ),
                    )}
                </>
            ) : (
                <main className={styles.noCountry} role="main" aria-describedby="not-found">
                    <h1 id="not-found" aria-label="Error 404: Page not found">
                        404
                    </h1>
                </main>
            )}
        </main>
    );
};
export default ReviewBox;
