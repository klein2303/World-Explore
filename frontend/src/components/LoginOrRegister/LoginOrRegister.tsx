import { useState } from "react";
import styles from "./LoginOrRegister.module.css";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

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

    // GraphQL mutation for user signup, requiring username, email, and password as input
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

    // GraphQL mutation for user login, requiring email and password as input
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
        // On successful login, store token and user email, then navigate to the home page
        onCompleted: async ({ login }) => {
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
        // On successful signup, store token and user email, then navigate to the home page
        onCompleted: async ({ signup }) => {
            setError("");
            sessionStorage.setItem("auth-token", signup.token);
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
        } else {
            setPassword(value);
        }
    };

    const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == "name") {
            setUsername(value);
        } else if (name == "email") {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (loginPage) {
                login({ variables: { email, password } });
            } else {
                signup({ variables: { username, email, password } });
            }
        }
    };

    return (
        <section aria-label="Login og register component">
            {loginPage ? (
                <section className={styles.loginOrRegister} aria-label="Login">
                    {/*Login component*/}
                    <section className={styles.title} aria-labelledby="log-in">
                        <h3 id="log-in">Log in</h3>
                        <h4>Enter your WorldExplore account details</h4>
                    </section>
                    <hr className={styles.line} />
                    <section className={styles.inputSections} aria-label="Input fields">
                        <input
                            className={styles.inputField}
                            type="email"
                            name="email"
                            data-cy="email"
                            value={email}
                            onChange={handleLoginInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Email"
                            aria-description="Email input field for login"
                        />
                        <input
                            className={styles.inputField}
                            type="password"
                            name="password"
                            data-cy="loginpassword"
                            value={password}
                            onChange={handleLoginInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Password"
                            aria-description="Password input field for login"
                        />
                        {error !== "" && <h5 data-cy="loginerror">{error}</h5>}
                        <button
                            type = "submit"
                            className={styles.submitButton}
                            data-cy="submitlogin"
                            onClick={() => login({ variables: { email, password } })}>
                            Log in
                        </button>
                    </section>
                </section>
            ) : (
                <section className={styles.loginOrRegister} aria-label="Register a new account">
                    {/*Register component*/}
                    <section className={styles.title} aria-labelledby="create-account">
                        <h5 id="create-account">Create an account</h5>
                    </section>
                    <hr className={styles.line} />
                    <section className={styles.inputSections} aria-label="Input fields">
                        <input
                            className={styles.inputField}
                            type="text"
                            name="name"
                            data-cy="registername"
                            value={username}
                            onChange={handleRegisterInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Please enter your name"
                            aria-description="Name input field"
                        />
                        <input
                            className={styles.inputField}
                            type="email"
                            name="email"
                            data-cy="registeremail"
                            value={email}
                            onChange={handleRegisterInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Please enter your email"
                            aria-description="Email input field"
                        />
                        <input
                            className={styles.inputField}
                            type="password"
                            name="password"
                            data-cy="registerpassword"
                            value={password}
                            onChange={handleRegisterInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Please enter a password"
                            aria-description="Password input field"
                        />
                        {error !== "" && <h5 data-cy="registererror">{error}</h5>}
                        <button
                            type = "submit"
                            data-cy="submitregister"
                            className={styles.submitButton}
                            onClick={() => signup({ variables: { username, email, password } })}>
                            Create account
                        </button>
                    </section>
                </section>
            )}
        </section>
    );
};

export default LoginOrRegister;
