import LoginOrRegister from "../components/LoginOrRegister/LoginOrRegister";
import styles from "../styles/LoginAndRegister.module.css";
import loginImage from "/loginImagePurple.jpg?url";
import {Link} from "react-router-dom";

const Register = () => {
    return (
        <main className={styles.registerPage} aria-label="Register page">
            <section className={styles.inputSection} aria-label="A section for inputs">
                <section className={styles.headerRegisterPage} aria-label="Header of register page">
                    <section className={styles.logo} aria-label="Logo">
                        <Link to={"/ExploreCountries"} className={styles.logoLink} aria-label="link to home page">
                            <p aria-label="World explore">WorldExplore</p>
                        </Link>
                    </section>
                    <section className={styles.linkToLogIn} aria-label="A link to login">
                        <Link to={"/LogIn"} className={styles.navlinkOver} aria-label="link">
                            <p aria-label="Already registered?"> Already registered?</p>
                        </Link>
                    </section>
                </section>
                <LoginOrRegister login={false} />
                <section className={styles.linkToLogInUnder} aria-label="A link to login">
                    <Link to={"/LogIn"} className={styles.navlinkUnder} aria-label="link">
                        <p aria-label="Already registered">Already registered?</p>
                    </Link>
                </section>
            </section>
            <section className={styles.image} aria-label="image">
                <img
                    src={loginImage}
                    className={styles.imageimage}
                    alt="A beautiful landscape"
                    width="700"
                    height="700"
                    aria-label="A beautiful image of a landscape"></img>
            </section>
        </main>
    );
};

export default Register;
