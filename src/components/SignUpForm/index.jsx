import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { signupWithEmail } from "../../services/user";

import "./styles.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await signupWithEmail(email, password, navigate);
      const data = await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <div className="sign-up-form__container">
        <label
          className={`sign-up-form__label ${error ? "error--label" : ""}`}
          htmlFor="email"
        >
          E-mail
        </label>
        <input
          className={`sign-up-form__input ${error ? "error--input" : ""}`}
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="sign-up-form__container">
        <label
          className={`sign-up-form__label ${error ? "error--label" : ""}`}
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={`sign-up-form__input ${error ? "error--input" : ""}`}
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="sign-up-form__submit-btn" type="submit">
        {loading ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
