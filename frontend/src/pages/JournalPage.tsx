import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { PiArrowElbowDownLeft } from "react-icons/pi";
import styles from "../styles/JournalPage.module.css"
import ReviewBox from "../components/ReviewBox/ReviewBox";
import { JournalType } from "../types/JournalType";

interface review{
    jounalReviews: JournalType;
}

const JournalPage = ({jounalReviews}: review) => {
    return (
        <>
            <Navbar/>
            <main className= {styles.page} aria-label= "Page for writing your journal">
                <Link to = {"/"} className= {styles.returnLink} aria-label= "Return to all journals"> <PiArrowElbowDownLeft /> Return to all journals</Link>
                <p className= {styles.title}>{jounalReviews.country}</p>
                <ReviewBox jounalReviews={{
                    country: jounalReviews.country,
                    reviews: jounalReviews.reviews
                }} country={jounalReviews.country} />
            </main>
        </>
    );
};

export default JournalPage;
