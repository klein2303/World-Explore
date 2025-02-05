import styles from "./ReviewBox.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { gql, useMutation, useQuery } from "@apollo/client";
import { removeQuotes } from "../../utils/utils";
import { PiArrowElbowDownLeft } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";

interface journalCountry {
    country: string;
}

const ReviewBox = ({ country }: journalCountry) => {
    const user = removeQuotes(sessionStorage.getItem("user")!);
    const navigation = useNavigate(); // For navigation to other pages

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

    const journalId = data?.writtenjournal.id;

    // When the button is pressed, the user gets navigated to respective country's country-page
    const handleOnClick = () => {
        navigation(`/Countries/${country}`);
    };

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

    const DELETE_REVIEW = gql`
        mutation DeleteReview($id: ID!, $journalid: Int!) {
            deleteReview(id: $id, journalid: $journalid)
        }
    `;

    // For deleting reviews
    const [deleteReview] = useMutation(DELETE_REVIEW, {
        onCompleted: (data) => {
            if (data.deleteReview === 0) {
                navigation("/MyJournals");
            } else {
                navigation(0);
            }
        },
        onError: (error) => {
            console.error("Error deleting review:", error.message);
        },
    });

    const handleClick = async (id: number, journalid: string) => {
        try {
            await deleteReview({
                variables: { id: id, journalid: parseInt(journalid, 10) },
            });
        } catch (error) {
            console.error("Failed to delete review:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <main className="main">
            {data.writtenjournal ? (
                <>
                    <section>
                        <section className={styles.linkAndButton}>
                            <Link to={"/MyJournals"} className={styles.returnLink}>
                                {" "}
                                <PiArrowElbowDownLeft /> Return to all journals
                            </Link>
                            <button className={styles.countryPageButton} onClick={handleOnClick}>
                                Go to info page
                            </button>
                        </section>
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
                                <section className={styles.iconcontainer}>
                                    <IoTrashOutline
                                        className={styles.deleteIcon}
                                        aria-label="delete"
                                        onClick={() => handleClick(review.id, journalId)}
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                handleClick(review.id, journalId);
                                            }
                                        }}
                                    />
                                </section>
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
