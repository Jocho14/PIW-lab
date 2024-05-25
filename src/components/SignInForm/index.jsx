import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginWithEmail } from "../../services/user";

import "./styles.css";

const SignInForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await loginWithEmail(email, password, navigate);
      const data = await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
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
          "Sign in"
        )}
      </button>
    </form>
  );
};

export default SignInForm;
