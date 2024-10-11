import LoginOrRegister from "../components/LoginOrRegister/LoginOrRegister";
import styles from "../styles/LoginAndRegister.module.css";
import loginImage from "/loginImagePurple.jpg?url";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <main className={styles.registerPage} aria-label="Login page">
            <section className={styles.inputSection} aria-label="A section for inputs">
                <section className={styles.headerRegisterPage} aria-label="Header of login page">
                    <section className={styles.logo} aria-label="Logo">
                        <Link to={"/"} className={styles.logoLink} aria-label="link to home page">
                            <p aria-label="World explore">WorldExplore</p>
                        </Link>
                    </section>
                    <section className={styles.linkToLogIn} aria-label="A link to login">
                        <Link to={"/Register"} className={styles.navlinkOver} aria-label="link">
                            <p aria-label="Already registered?"> Create an account</p>
                        </Link>
                    </section>
                </section>
                <LoginOrRegister login={true} />
                <section className={styles.linkToLogInUnder} aria-label="A link to login">
                    <Link to={"/Register"} className={styles.navlinkUnder} aria-label="link">
                        <p aria-label="Already registered">Create an account</p>
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

export default Login;
