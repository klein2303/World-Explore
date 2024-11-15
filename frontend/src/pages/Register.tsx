import LoginOrRegister from "../components/LoginOrRegister/LoginOrRegister";
import styles from "../styles/LoginAndRegister.module.css";
import loginImage from "/loginImagePinkFlower.jpg?url";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Register = () => {
    return (
        <main className={styles.registerPage} aria-label="Register page">
            <section className={styles.inputSection} aria-description="A section for inputs">

                <section className={styles.header} aria-label="Header of register page">
                    <section className={styles.logo} aria-label="Logo">
                        <Link to={"/ExploreCountries"} className={styles.logoLink} aria-description="link to home page">
                            <p aria-label="World explore">WorldExplore</p>
                        </Link>
                        <Link to={"/"} className={styles.arrowLink} aria-label="link to home page">
                            <IoIosArrowBack className={styles.arrow} aria-label="arrow to home page" />
                        </Link>
                    </section>
                    <section className={styles.linkToLogIn}>
                        <Link to={"/LogIn"} className={styles.navlinkOver} aria-describedby="registered">
                            <p id = "registered"> Already registered?</p>
                        </Link>
                    </section>
                </section>
                <section className={styles.loginOrRegisterComponent}>
                    <LoginOrRegister loginPage={false} />
                </section>
                <section className={styles.linkToLogInUnder}>
                    <Link to={"/LogIn"} className={styles.navlinkUnder} aria-describedby="registered-mobile">
                        <p id = "registered">Already registered?</p>
                    </Link>
                </section>
            </section>

            <section className={styles.image} >
                <img
                    src={loginImage}
                    className={styles.imageimage}
                    alt="A beautiful landscape"
                    width="700"
                    height="700"></img>
            </section>
        </main>
    );
};

export default Register;
