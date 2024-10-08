import {useState} from "react";
import styles from "./LoginOrRegister.module.css";

interface Profile {
    name: string;
    email: string;
    password: string;
}

const LoginOrRegister = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<Profile>({
        name: "",
        email: "",
        password: "",
    });
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string>("Password must at least be 8 characters");
    // Load existing users from local storage
    const loadUsers = (): Profile[] => {
        const storedUsers = localStorage.getItem("userProfiles");
        return storedUsers ? JSON.parse(storedUsers) : [];
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        // Password validation: Check if password has at least 8 characters
        if (name === "password") {
            setIsValidPassword(value.length >= 8);
        }
    };

    const handleSubmit = () => {
        const existingUsers = loadUsers();
        if (formValues.name.length === 0 || formValues.email.length === 0 || formValues.password.length === 0) {
            setFeedbackMessage("Please enter all of the fields");
        } else if (existingUsers.some((user) => user.email === formValues.email)) {
            setFeedbackMessage("Email already exists. Please use a different email.");
        } else if (!isValidPassword) {
            setFeedbackMessage("Password is not valid. Password must have 8 characters.");
        } else {
            existingUsers.push(formValues);
            localStorage.setItem("userProfiles", JSON.stringify(existingUsers));
            setFormValues({
                name: "",
                email: "",
                password: "",
            });
            setIsValidPassword(false);
            setFeedbackMessage("Account is made successfully");

            // Delay the switch to login form by 1 second
            setTimeout(() => {
                setIsLogin(true);
            }, 1000);
        }
    };

    return (
        <section aria-label="Login og register component">
            {isLogin ? (
                <section>
                    {/*Make login component here*/}
                    <title aria-label="Login title">Login</title>
                    <h4>User</h4>
                </section>
            ) : (
                <section className={styles.loginOrRegister} aria-label="Register a new account">
                    {/*Register component*/}
                    <div className={styles.title} aria-label="Title">
                        <h3 aria-label="Create a new account">Create an account</h3>
                    </div>
                    <hr className={styles.line} />
                    <section className={styles.inputSections} aria-label="Input fields">
                        <input
                            className={styles.inputField}
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleInputChange}
                            placeholder="Place enter your name"
                            aria-label="Name input field"
                        />
                        <input
                            className={styles.inputField}
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            placeholder="Please enter your email"
                            aria-label="Email input field"
                        />
                        <input
                            className={styles.inputField}
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                            placeholder="Please enter a password"
                            aria-label="Password input field"
                        />
                        <h5 aria-label={feedbackMessage}> {feedbackMessage}</h5>
                        <button
                            className={styles.submitButton}
                            onClick={handleSubmit}
                            aria-label="Submit to create a new account">
                            Create account
                        </button>
                    </section>
                </section>
            )}
        </section>
    );
};

export default LoginOrRegister;
