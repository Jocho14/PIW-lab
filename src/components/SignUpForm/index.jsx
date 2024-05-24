//import { useState } from "react";

import "./styles.css";

const SignUpForm = () => {
  //const [error, setError] = useState(false);
  const error = false; // remove (just for sucess production build)

  const handleSubmit = () => {};

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
          required
        />
      </div>

      <div className="sign-up-form__container">
        <label
          className={`sign-up-form__label ${error ? "error--label" : ""}`}
          htmlFor="name"
        >
          Name
        </label>
        <input
          className={`sign-up-form__input ${error ? "error--input" : ""}`}
          id="name"
          type="text"
          required
        />
      </div>

      <div className="sign-up-form__container">
        <label
          className={`sign-up-form__label ${error ? "error--label" : ""}`}
          htmlFor="surname"
        >
          Surname {"(optional)"}
        </label>
        <input
          className={`sign-up-form__input ${error ? "error--input" : ""}`}
          id="surname"
          type="text"
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
          required
        />
      </div>
      <button className="sign-up-form__submit-btn" type="submit">
        Utwórz konto
      </button>
    </form>
  );
};

export default SignUpForm;
