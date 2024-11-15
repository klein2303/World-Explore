import Navbar from "../components/Navbar/Navbar";
import PopularCountries from "../components/PopularCountries/PopularCountries";
import styles from "../styles/Homepage.module.css";
import homepage from "/homeImage.avif";

const Home = () => {
    return (
        <>
            <Navbar />
            {/*Homepage showing an image and some text on the image */}
            <main className={styles.page} role="main" aria-label="Homepage">
                <article className={styles.imageArticle} aria-label="Homepage image">
                    <img src={homepage} alt="The ocean in a tropical landscape" className={styles.image} />
                    <section className={styles.text}>
                        <p className={styles.topText}>All your special travels at one place</p>
                        <p className={styles.bottomText}>Explore and write to your heart's content</p>
                    </section>
                </article>
                {/*Adding buttons showing the 10 most popular countries on the Homepage. This is currently implemented azz labels, and they are not clickable for the user*/}
                <PopularCountries />
            </main>
        </>
    );
};

export default Home;
