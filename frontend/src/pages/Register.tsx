import LoginOrRegister from "../components/LoginOrRegister/LoginOrRegister";
import styles from "../styles/Register.module.css";
import loginImage from "frontend/public/loginImagePurple.jpg";
import {Link} from "react-router-dom";

const Register = () => {
    return ( 
    <div className={styles.registerPage}>
        <section className={styles.inputSection}>
            <section className={styles.headerRegisterPage}>
                <section className={styles.logo}>
                    <p>WorldExplore</p>
                </section>
                <section className={styles.linkToLogIn}>
                    <Link to={"/LogIn"} className={styles.navlinkOver}>
                        <p>Already registered?</p>
                    </Link>
                </section>
            </section>
            <LoginOrRegister/>
            <section className={styles.linkToLogInUnder}>
                <Link to={"/LogIn"} className={styles.navlinkUnder}>
                    <p>Already registered?</p>
                </Link>
            </section>
        </section>
        <section className={styles.image}>
            <img src= {loginImage} alt="A beautiful landscape" width="700" height="700"></img>
        </section>
    </div>

    );
};

export default Register;
