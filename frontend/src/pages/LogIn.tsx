import LoginOrRegister from "../components/LoginOrRegister/LoginOrRegister";
import styles from "../styles/LoginAndRegister.module.css";
import loginImage from "/loginImageFlower.jpg?url";
import {Link} from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Login = () => {
    return (
        <main className={styles.loginPage} aria-label="Login page">
            <section className={styles.inputSection} aria-description="A section for inputs">
                <section className={styles.header} aria-label="Header of login page">
                    <section className={styles.logo} aria-label="Logo">
                        <Link to={"/"} className={styles.logoLink} aria-description="link to home page">
                            <p >WorldExplore</p>
                        </Link>
                        <Link to={"/"} className={styles.arrowLink}>
                            <IoIosArrowBack className={styles.arrow} aria-description="arrow to home page" />
                        </Link>
                    </section>
                    <section className={styles.linkToLogIn} >
                        <Link to={"/Register"} className={styles.navlinkOver} aria-describedby="create-account">
                            <p id = "create-account"> Create an account</p>
                        </Link>
                    </section>
                </section>
                <section className={styles.loginOrRegisterComponent}>
                    <LoginOrRegister loginPage={true} />
                </section>
                <section className={styles.linkToLogInUnder} aria-describedby="create-account-mobile">
                    <Link to={"/Register"} className={styles.navlinkUnder} >
                        <p id = "create-account-mobile">Create an account</p>
                    </Link>
                </section>
            </section>
            <section className={styles.image}>
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

export default Login;
