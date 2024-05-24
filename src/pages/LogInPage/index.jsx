import { useState } from "react";
import { Link } from "react-router-dom";

import SignInForm from "../../components/SignInForm";
import SignUpForm from "../../components/SignUpForm";

import leftArrowCircleIcon from "../../assets/left-arrow-circle-dark-icon.svg";
import "./styles.css";

const LogInPage = () => {
  const [activeForm, setActiveForm] = useState("signin");

  return (
    <div className="log-in">
      <Link to="/">
        <img className="log-in__close-link" src={leftArrowCircleIcon} />
      </Link>
      <div className="log-in__section log-in__section--right">
        <div className="log-in__form">
          <div className="form-switch">
            <button
              className={`form-switch__btn form-switch__btn--sign-in ${
                activeForm === "signin" ? "form-switch__btn--active" : ""
              } `}
              onClick={() => setActiveForm("signin")}
            >
              Log in
            </button>
            <button
              className={`form-switch__btn form-switch__btn--sign-up ${
                activeForm === "signup" ? "form-switch__btn--active" : ""
              } `}
              onClick={() => setActiveForm("signup")}
            >
              Create an account
            </button>
          </div>
          <div className="form-content">
            {activeForm === "signin" ? <SignInForm /> : <SignUpForm />}
          </div>
          <div className="form-action"></div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
