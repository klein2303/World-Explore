import LoginOrRegister from "../components/LoginOrRegister/LoginOrRegister";
import styles from "../styles/Register.module.css";
import loginImage from "frontend/public/loginImagePurple.jpg";
import {Link} from "react-router-dom";

const Register = () => {
    return ( 
    <div className={styles.registerPage} aria-label= "Register page">
        <section className={styles.inputSection} aria-label= "A section for inputs">
            <section className={styles.headerRegisterPage} aria-label= "Header of register page">
                <section className={styles.logo} aria-label= "Logo">
                    <p aria-label= "World explore">WorldExplore</p>
                </section>
                <section className={styles.linkToLogIn} aria-label= "A link to login">
                    <Link to={"/LogIn"} className={styles.navlinkOver} aria-label= "link">
                        <p aria-label= "Already registered?"> Already registered?</p>
                    </Link>
                </section>
            </section>
            <LoginOrRegister/>
            <section className={styles.linkToLogInUnder} aria-label= "A link to login">
                <Link to={"/LogIn"} className={styles.navlinkUnder} aria-label= "link">
                    <p aria-label= "Already registered">Already registered?</p>
                </Link>
            </section>
        </section>
        <section className={styles.image} aria-label= "image">
            <img src= {loginImage} alt="A beautiful landscape" width="700" height="700"></img>
        </section>
    </div>

    );
};

export default Register;
