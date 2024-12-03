import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/JournalPage.module.css";
import ReviewBox from "../components/ReviewBox/ReviewBox";
import { useEffect } from "react";

const JournalPage = () => {
    // Get countryName from the URL
    const { countryName } = useParams<{ countryName: string }>();

    // Let country be an default string if countryName is empty
    const country = countryName || "";

    // Scroll to top when the component mounts
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <>
            <Navbar />
            <main className={styles.page} aria-description="Page for reading your journals">
                <ReviewBox country={country} />
            </main>
        </>
    );
};

export default JournalPage;
