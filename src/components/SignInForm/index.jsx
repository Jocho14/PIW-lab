import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const SignInForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let loginSuccessful = false;
    try {
      await login(email, password);
      loginSuccessful = true;
    } catch (error) {
      setError(true);
      console.log("FFFAILEDD");
    } finally {
      if (loginSuccessful) {
        navigate("/");
      }
      setLoading(false);
    }
  };

  return (
    <form className={"sign-in-form"} onSubmit={handleSubmit}>
      <div className="sign-in-form__container">
        <label
          className={`sign-in-form__label ${error ? "error--label" : ""}`}
          htmlFor="email"
        >
          E-mail
        </label>
        <input
          className={`sign-in-form__input ${error ? "error--input" : ""}`}
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="sign-in-form__container">
        <label
          className={`sign-in-form__label ${error ? "error--label" : ""}`}
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={`sign-in-form__input ${error ? "error--input" : ""}`}
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="sign-in-form__submit-btn" type="submit">
        {loading ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          "Zaloguj się"
        )}
      </button>
    </form>
  );
};

export default SignInForm;
