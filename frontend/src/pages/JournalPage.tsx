import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { PiArrowElbowDownLeft } from "react-icons/pi";
import styles from "../styles/JournalPage.module.css"
import ReviewBox from "../components/ReviewBox/ReviewBox";
import { SlPencil } from "react-icons/sl";
import { useEffect } from "react";


const JournalPage = () => {
    // Get countryName from the URL 
    const { countryName } = useParams<{ countryName: string }>();
    
    // Let country be an default string if countryName is empty 
    const country = countryName || "";

    // Scroll to top when the component mounts
    useEffect(() => {
        window.scrollTo({ top: 0});
      }, []);

    return (
        <>
            <Navbar/>
            <main className= {styles.page} aria-label= "Page for reading your journals">
                <Link to = {"/MyJournals"} className= {styles.returnLink} aria-label= "Return to all journals"> <PiArrowElbowDownLeft /> Return to all journals</Link>
                <section className= {styles.upperSection}>
                    <p className={styles.title}>My {countryName} journals</p>
                    <button className= {styles.addButton} aria-label= "Add new journal entry">Add new journal entry <SlPencil /></button>
                </section>
                <ReviewBox country={country}  />
            </main>
        </>
    );
};

export default JournalPage;
