import { useState } from "react";
import styles from "./LoginOrRegister.module.css";

interface Profile {
    name: string; 
    email: string; 
    password: string; 
}

interface ComponentInterface {
  //an input to decide whether this component is gonna be used as a login component. Otherwise it is a register component 
  login: boolean; 
}

const LoginOrRegister = ({login} : ComponentInterface) => {
    

    const[isValidEmail, setIsValidEmail] = useState<boolean>(false);
    
    const[isExistingEmail, setIsExistingEmail] = useState<boolean>(false);
    const[isExistingUsername, setIsExistingUsername] = useState<boolean>(false);

    const[isValidPassword, setIsValidPassword] = useState<boolean>(false)
    const[isCorrectPassword, setIsCorrectPassword] = useState<boolean>(false)

    const[registerFeedbackMessage, setRegisterFeedbackMessage] = useState<string>("Password must at least be 8 characters");
    const[loginFeedbackMessage, setLoginFeedbackMessage] = useState<string>("");

    //Get the data from the input
    const[registerFormValues, setRegisterFormValues] = useState<Profile>({
        name: "",
        email: "",
        password: ""
      });

    const [loginFormValues, setLoginFormValues] = useState<{ nameOrEmail: string; password: string }>({
        nameOrEmail: "",
        password: ""
    });
    
    // Load existing users from local storage
    const loadUsers = (): Profile[] => {
      const storedUsers = localStorage.getItem("userProfiles");
      return storedUsers ? JSON.parse(storedUsers) : [];
    };

    const handleRegisterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterFormValues({
          ...registerFormValues,
          [name]: value
        });
        // Email validation: Check if the input email has a "@" character and ".com" at the end
        if (name == "email") {
          if(value.includes("@") && value.split("@")[0].length > 0 && value.split("@")[1].length > 0 && value.includes(".") && value.split(".")[1] == "com"){
            setIsValidEmail(true);
          }
        }
        // Password validation: Check if password has at least 8 characters
        if (name === "password") {
           setIsValidPassword(value.length >= 8);
        }
      };

    const handleLoginInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target; 
        setLoginFormValues({
          ...loginFormValues,
          [name]: value
        });

    };

      const handleSubmit = () => {
        const existingUsers = loadUsers();
        if (registerFormValues.name.length === 0 || registerFormValues.email.length === 0 || registerFormValues.password.length === 0) {
          setRegisterFeedbackMessage("Please enter all of the fields");
        } else if (!isValidEmail){
          setRegisterFeedbackMessage("Email is not in the correct format")
        } else if (existingUsers.some(user => user.email === registerFormValues.email)) {
          setRegisterFeedbackMessage("Email already exists. Please use a different email");
        } else if (!isValidPassword) {
          setRegisterFeedbackMessage("Password is not valid. Password must have 8 characters");
        } else {
          existingUsers.push(registerFormValues);
          localStorage.setItem("userProfiles", JSON.stringify(existingUsers));
          setRegisterFormValues({
            name: "",
            email: "",
            password: ""
          });
          setIsValidPassword(false);
          setRegisterFeedbackMessage("Account is made successfully");

        }
      };

      const handleLogin = () => {
        const existingUsers = loadUsers();
    
        // Find user by username or email
        const user = existingUsers.find(
            (user) => user.name === loginFormValues.nameOrEmail || user.email === loginFormValues.nameOrEmail
        );
    
        // Check if user exists
        if (!user) {
            setLoginFeedbackMessage("No such username/email");
            return;
        }
    
        // Check if the password matches
        if (user.password !== loginFormValues.password) {
            setLoginFeedbackMessage("Wrong password");
            return;
        }
    
        // If everything is correct
        setLoginFeedbackMessage("Log in successful");
        setLoginFormValues({
            nameOrEmail: "",
            password: ""
        });
    };

    return(
        <section aria-label= "Login og register component">
                {login? <section className= {styles.loginOrRegister} aria-label= "Login">
                  {/*Login component*/}
                    <section className={styles.title} aria-label= "Title">
                        <h3 aria-label= "Login page">Log in</h3>
                        <h4 aria-label= "Enter account details">Enter your WorldExplore account details</h4>
                    </section>
                    <hr className={styles.line}/>
                    <section className={styles.inputSections} aria-label= "Input fields">
                        <input className= {styles.inputField} type="text"name="nameOrEmail" value={loginFormValues.nameOrEmail} onChange={handleLoginInputChange} placeholder="Email or username" aria-label= "Name or email input field for login"/>
                        <input className= {styles.inputField} type="password" name="password" value={loginFormValues.password} onChange={handleLoginInputChange} placeholder="Password" aria-label= "Password input field for login"/>
                        <h5 aria-label= {loginFeedbackMessage}> {loginFeedbackMessage}</h5>
                        <button className= {styles.submitButton} onClick={handleLogin} aria-label= "Login button">Log in</button>
                    </section>                  
                </section>
                : <section className= {styles.loginOrRegister} aria-label= "Register a new account">
                  {/*Register component*/}
                    <section className={styles.title} aria-label= "Title">
                        <h3 aria-label= "Create a new account">Create an account</h3>
                    </section>
                    <hr className={styles.line}/>
                    <section className={styles.inputSections} aria-label= "Input fields">
                        <input className= {styles.inputField} type="text"name="name" value={registerFormValues.name} onChange={handleRegisterInputChange} placeholder="Please enter your name" aria-label= "Name input field"/>
                        <input className= {styles.inputField} type="email" name="email" value={registerFormValues.email} onChange={handleRegisterInputChange} placeholder="Please enter your email" aria-label= "Email input field"/>
                        <input className= {styles.inputField} type="password" name="password" value={registerFormValues.password} onChange={handleRegisterInputChange} placeholder="Please enter a password" aria-label= "Password input field"/>
                        <h5 aria-label= {registerFeedbackMessage}> {registerFeedbackMessage}</h5>
                        <button className= {styles.submitButton} onClick={handleSubmit} aria-label= "Submit to create a new account">Create account</button>
                    </section>                  
                </section>}       
        </section>
    )


}

export default LoginOrRegister;