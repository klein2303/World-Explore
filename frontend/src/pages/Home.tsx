import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Homepage.module.css"
import homepage from "/homepage.svg"
import PopularCountries from "../components/PopularCountries/PopularCountries";

const Home = () => {
    return (
        <>
            <Navbar />
            {/*Homepage showing an image and some text on the image */}
            <main className={styles.page} role="main" aria-label="Homepage">
                <article className={styles.imageArticle} aria-label= "Homepage image">
                    <img src= {homepage} alt="World map with different monuments on top" className={styles.image} />
                    <p className={styles.topText}>All your special travels at one place</p>
                    <p className={styles.bottomText}>Explore and write to your heart's content</p>
                </article>
                {/*Adding buttons showing the 10 most popular countries on the Homepage */}
                <PopularCountries />
            </main>
        </>
    );
};

export default Home;
