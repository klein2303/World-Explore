import { useState } from "react";
import styles from "./LoginOrRegister.module.css";
import { useNavigate } from "react-router-dom";
import { gql , useMutation} from "@apollo/client";

interface ComponentInterface {
    //an input to decide whether this component is gonna be used as a login component. Otherwise it is a register component
    loginPage: boolean;
}

const LoginOrRegister = ({ loginPage }: ComponentInterface) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();

    const SIGNUP_MUTATION = gql`
        mutation Signup($username: String!, $email: String!, $password: String!) {
            signup(username: $username, email: $email, password: $password) {
            token
            user {
                email
            }
            }
        }
    `;

    const LOGIN_MUTATION = gql`
        mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
            token
            user {
                email
            }
            }
        }
    `;

    const [login] = useMutation(LOGIN_MUTATION, {
        onCompleted: async ({login}) => {
            setError("");
            sessionStorage.setItem("auth-token", login.token);
            sessionStorage.setItem("user", JSON.stringify(login.user.email));
            navigate("/");
        },
        onError: (error) => {
            setError(error.message);
        },
    });

    const [signup] = useMutation(SIGNUP_MUTATION, {
        onCompleted: async ({signup}) => {
            setError("");
            localStorage.setItem("auth-token", signup.token);
            sessionStorage.setItem("user", JSON.stringify(signup.user.email));
            navigate("/");
        },
        onError: (error) => {
            setError(error.message);
        },
    });

    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } 
        else{
            setPassword(value);
        }
    };

    const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == "name") {
            setUsername(value);
        }
        else if (name == "email") {
            setEmail(value);
        }
        else {
            setPassword(value);
        }
    };

    return (
        <section aria-label="Login og register component">
            {loginPage ? (
                <section className={styles.loginOrRegister} aria-label="Login">
                    {/*Login component*/}
                    <section className={styles.title} aria-label="Title">
                        <h3 aria-label="Login page">Log in</h3>
                        <h4 aria-label="Enter account details">Enter your WorldExplore account details</h4>
                    </section>
                    <hr className={styles.line} />
                    <section className={styles.inputSections} aria-label="Input fields">
                        <input
                            className={styles.inputField}
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleLoginInputChange}
                            placeholder="Email"
                            aria-label="Email input field for login"
                        />
                        <input
                            className={styles.inputField}
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleLoginInputChange}
                            placeholder="Password"
                            aria-label="Password input field for login"
                        />
                        {error !== "" && (
                            <h5>{error}</h5>
                        )}
                        <button className={styles.submitButton} onClick={() => login({ variables: { email, password } })} aria-label="Login button">
                            Log in
                        </button>
                    </section>
                </section>
            ) : (
                <section className={styles.loginOrRegister} aria-label="Register a new account">
                    {/*Register component*/}
                    <section className={styles.title} aria-label="Title">
                        <h3 aria-label="Create a new account">Create an account</h3>
                    </section>
                    <hr className={styles.line} />
                    <section className={styles.inputSections} aria-label="Input fields">
                        <input
                            className={styles.inputField}
                            type="text"
                            name="name"
                            value={username}
                            onChange={handleRegisterInputChange}
                            placeholder="Please enter your name"
                            aria-label="Name input field"
                        />
                        <input
                            className={styles.inputField}
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleRegisterInputChange}
                            placeholder="Please enter your email"
                            aria-label="Email input field"
                        />
                        <input
                            className={styles.inputField}
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleRegisterInputChange}
                            placeholder="Please enter a password"
                            aria-label="Password input field"
                        />
                        {error !== "" && (
                            <h5>{error}</h5>
                        )}
                        <button
                            className={styles.submitButton}
                            onClick={() => signup({ variables: { username, email, password } })}
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
