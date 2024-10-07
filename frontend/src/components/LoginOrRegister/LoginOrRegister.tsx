import { useState } from "react";
import styles from "./LoginOrRegister.module.css";

const LoginOrRegister = () => {
    const[isLogin, setIsLogin] = useState(false);
    const[formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: ""
      });
    
    const[isValidPassword, setIsValidPassword] = useState(false)
    const[feedbackMessage, setFeedbackMessage] = useState("Password must at least be 8 characters");
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
          ...formValues,
          [name]: value
        });
        // Password validation: Check if password has at least 8 characters
        if (name === "password") {
           setIsValidPassword(value.length >= 8);
        }
      };
    
      const handleSubmit = () => {
        if(formValues.name.length == 0 || formValues.email.length == 0 || formValues.password.length == 0){
          setFeedbackMessage("Please enter all of the fields");
        }
        else if(isValidPassword){
            console.log("Form Values:", formValues);
            setFormValues({
                name: "",
                email: "",
                password: ""
              });
            setIsValidPassword(false);
            setFeedbackMessage("Account is made successfully")
            setIsLogin(true)
        }
        else{
            console.log("Password is not valid."); 
            setFeedbackMessage("Password is not valid. Password must have 8 characters.")
        }
        
      };

      

    return(
        <section>
                {isLogin? <section>
                    {/*Make register component here*/}
                    <title>Login</title>
                    <h4>User</h4>
                </section>
                : <section className= {styles.loginOrRegister}>
                    <div className={styles.title}>
                        <h3>Create an account</h3>
                    </div>

                    <hr />
                    <section className={styles.inputSections}>
                        <input className= {styles.inputField} type="text"name="name" value={formValues.name} onChange={handleInputChange} placeholder="Place enter your name"/>
                        <input className= {styles.inputField} type="email" name="email" value={formValues.email} onChange={handleInputChange} placeholder="Please enter your email"/>
                        <input className= {styles.inputField} type="password" name="password" value={formValues.password} onChange={handleInputChange} placeholder="Please enter a password"/>
                        <h5>{feedbackMessage}</h5>
                        <button className= {styles.submitButton} onClick={handleSubmit}>Create account</button>


                    </section>
                    
                </section>}

            
        </section>
    )


}

export default LoginOrRegister;