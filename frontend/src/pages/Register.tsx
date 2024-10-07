import LoginOrRegister from "../components/LoginOrRegister/LoginOrRegister";
import styles from "../styles/Register.module.css";
import loginImage from "frontend/public/loginSunset.jpg";

const Register = () => {
    return ( 
    <div className={styles.registerPage}>
        <section className={styles.inputSection}>
            <LoginOrRegister/>
        </section>
        <section className={styles.image}>
            <img src= {loginImage} alt="A beautiful landscape" width="700" height="700"></img>
            
        </section>

    </div>

    );
};

export default Register;
