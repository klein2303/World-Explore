import { useEffect, useState } from "react";
import { JournalType } from "../../types/JournalType";
import styles from "./ReviewBox.module.css"
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox} from "react-icons/md";
import JournalReviews from "../../data/JournalReviews";
import { FaRegStar, FaStar } from "react-icons/fa";

interface journalCountry{
    country: string
}

const ReviewBox = ({country}: journalCountry) => {
    
    // Find the journal reviews for the given country, return null if no match is found
  const getReview = () => {
    // Check if there are reviews stored in localStorage
    const storedReviews = localStorage.getItem(`reviews_${country}`);
    if (storedReviews) {
      return JSON.parse(storedReviews);
    }
    return JournalReviews.find((journal) => journal.country === country) || null;
  };

  // Initialize the state with the result of the getReview function
  const [reviews, setReviews] = useState<JournalType | null>(getReview());

  // Effect to store reviews in localStorage whenever they change
  useEffect(() => {
    if (reviews) {
      localStorage.setItem(`reviews_${country}`, JSON.stringify(reviews));
    }
  }, [reviews, country]);

    // Render 5 stars based on a given rating 
    const renderStars = (rating: number) => {
        const maxStars = 5;

        return Array.from({ length: maxStars }, (_, index) =>
            index < rating ? (
                <FaStar key={index} className={styles.starFilled} aria-label="filled star"/> 
            ) : (
                <FaRegStar key={index} className={styles.starNotFilled} aria-label="empty star"/> 
            )
        );
    };

    //Change the privacy of a review 
    const makePublic = (id: number) => {
        if(reviews) {
            const updatedReviews = reviews.reviews.map((review) =>
                review.id === id ? { ...review, public: !review.public } : review
              );
            
              setReviews({ ...reviews, reviews: updatedReviews });
        }
    }

    return(
        <main>
            {reviews ? (
                reviews.reviews.map((review) => (
                        <section key={review.id} className= {styles.reviewBox} aria-label= "Section containing the journal entry">
                            <p className= {styles.reviewTitle}>{review.title}</p>
                            <p className = {styles.date}>{review.date}</p>
                            <article className= {styles.reviewText}>{review.text} </article>
                            <section className= {styles.starsContainer} aria-label= "Shows rating of a trip, illustrated as stars">
                                {/* Render stars based on rating */}
                                {renderStars(review.rating)} 
                            </section>
                             <section className= {styles.publicContainer} aria-label= "Change the privacy of your journal">
                                <p>Make this journal entry public</p>
                                {/* Render the correct box based on the journal entry privacy */}
                                {review.public ? (
                                    <MdOutlineCheckBox
                                        className= {styles.checkBox}
                                        onClick={() => makePublic(review.id)}
                                        aria-label="Make journey private"
                                        role="button"
                                    />
                                    ) : (
                                    <MdOutlineCheckBoxOutlineBlank
                                        className= {styles.checkBox}
                                        onClick={() => makePublic(review.id)}
                                        aria-label="Make journey public"
                                        role="button"
                                    />
                                )}
                            </section>
                        </section>
                    ))
                ) : (
                <p className= {styles.noJournal}>No reviews found for {country}</p>
            )}
        </main>
    );
};

export default ReviewBox;