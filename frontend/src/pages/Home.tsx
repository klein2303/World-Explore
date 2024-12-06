import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Homepage.module.css";
import homepage from "/homeImage.avif";
import { TfiArrowDown } from "react-icons/tfi";

const Home = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/Register");
    };

    const token = sessionStorage.getItem("auth-token");

    const handleScrollDown = (): void => {
        const targetSection = document.getElementById("target-section");
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Navbar />
            {/* Homepage showing an image and some text on the image */}
            <main className={styles.page} role="main" aria-label="Homepage">
                <section className={styles.upperSection}>
                    <img src={homepage} alt="Pink Purple Sunset" className={styles.image} />
                    <section className={styles.contentOnPicture}>
                        <p className={styles.welcome}>Welcome to World Explore!</p>
                        <p className={styles.topText}>All your special travels at one place</p>
                        <p className={styles.bottomText}>Explore and write to your heart's content</p>
                        <button onClick={handleScrollDown}>
                            <TfiArrowDown className={styles.arrow} aria-label="arrow-down" />
                        </button>
                    </section>
                </section>
                <section id="target-section">
                    <div className={styles.aboutDiv} aria-description="about world explore">
                        <section className={styles.paragraphSection}>
                            <section className={styles.infoTextSection}>
                                <p className={styles.infoTextHeader}>Hello World!</p>
                                <p className={styles.infoText}>
                                    The world is an extraordinary canvas, filled with colors, cultures, and wonders
                                    shaped over the ages. From the snow-capped peaks of the Himalayas to the rolling
                                    dunes of the Sahara. From the vibrant energy of bustling cities to the peaceful
                                    villages by the sea. Our planet is an endless source of discovery and inspiration.
                                    Each part of the world has its own story to tell. Now imagine you travel to all
                                    these fantastic places. How cool wouldn't it be if you could save your memories at
                                    one place? We introduce you to World Explore!
                                </p>
                            </section>
                            <img
                                src="https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjY4NjN8MHwxfHNlYXJjaHwxfHxOb3J3YXl8ZW58MHx8fHwxNzI5NzExNzUyfDA&ixlib=rb-4.0.3&q=80&w=400"
                                alt="Fjords in Norway"
                                className={styles.infoImagesRight}></img>
                        </section>
                        <br />
                        <section className={styles.paragraphSection}>
                            <img
                                src="https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjY4NjN8MHwxfHNlYXJjaHwxfHxJbmRpYXxlbnwwfHx8fDE3Mjk3MDcxMTB8MA&ixlib=rb-4.0.3&q=80&w=400"
                                alt="Taj Mahal"
                                className={styles.infoImagesLeft}
                            />
                            <section className={styles.infoTextSection}>
                                <p className={styles.infoTextHeader}>Explore Countries!</p>
                                <p className={styles.infoText}>
                                    World Explore features a big catalog of different countries from the world. Our
                                    comprehensive search and browse features make it easy for you to find a country
                                    you’re interested in. Looking for a specific destination or eager to stumble upon
                                    somewhere new? Start your exploration here! Each country page is filled with
                                    captivating fun facts that highlight what makes that destination truly unique. Is
                                    climate important to you? Or do you want to learn about which language they speak in
                                    a certain country? These little insights are sure to fascinate you and deepen your
                                    appreciation of the diverse world we live in.
                                </p>
                            </section>
                        </section>
                        <br />
                        <section className={styles.paragraphSection}>
                            <section className={styles.infoTextSection}>
                                <p className={styles.infoTextHeader}>Write your own journals!</p>
                                <p className={styles.infoText}>
                                    World Explore is more than just a place to learn; it’s also a place where you can
                                    document your own travel experiences and dreams. We offer you the opportunity to
                                    create a journal entry to a country you have been to! Express yourself, share your
                                    thoughts, and capture what makes each country special to you. Wheter you want to
                                    document daily experiences, or document your travel as a whole. The choice is yours!
                                    It could be that your stories could inspire someone else to set off on their next
                                    big adventure!
                                </p>
                            </section>
                            <img
                                src="https://images.unsplash.com/photo-1462651567147-aa679fd1cfaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjY4NjN8MHwxfHNlYXJjaHwxfHxTd2l0emVybGFuZHxlbnwwfHx8fDE3Mjk3NzIyNzV8MA&ixlib=rb-4.0.3&q=80&w=400"
                                alt="Switzerland nature"
                                className={styles.infoImagesRight}
                            />
                        </section>
                        <br />
                        {token ? (
                            <></>
                        ) : (
                            <section className={styles.lastParagraphSection}>
                                <p className={styles.lastInfoText}>
                                    Create an account to start your exploration, create unforgettable memories, and let
                                    your journal entries bring the world to life.
                                </p>
                                <button className={styles.logInButton} onClick={handleOnClick}>
                                    Start now
                                </button>
                            </section>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;
