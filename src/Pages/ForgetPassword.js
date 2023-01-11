import React, { useState } from "react";
import { changePasswordMail, sendMail, validateCode } from "../api";
import "./ForgotPassword.css";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const cookies = new Cookies();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate email field
    if (message === "") {
      sendMail(email).then((res) => {
        if (!res.data.error) {
          setErrorMessage("");
          setMessage("success_email");
        } else {
          setErrorMessage(res.data.error);
        }
      });
    }
    if (message === "success_email") {
      validateCode(email, code).then((res) => {
        if (!res.data.error) {
          setErrorMessage("");
          setMessage("success_code");
        } else {
          setErrorMessage(res.data.error);
        }
      });
    }
    if (message === "success_code") {
      changePasswordMail(email, password, confirmPassword).then((res) => {
        if (!res.data.error) {
          setErrorMessage("");
          setMessage("");
          cookies.set("isAuthenticated", true, { path: "/" });
          cookies.set("userName", res.data.userName, { path: "/" });
          history.push("/home");
          window.location.reload(false);
        } else {
          setErrorMessage(res.data.error);
        }
      });
    }
    // Send forgot password request to server
  };

  return (
    <form className="forgot-password-form" onSubmit={handleSubmit}>
      {message === "success" && (
        <p className="form-message success">
          A password reset email has been sent to your email address.
        </p>
      )}

      {message === "" && (
        <>
          <label htmlFor="email">Email:</label>
          <input
            className="form-input"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errorMessage && <p className="error"> {errorMessage} </p>}

          <br />
          <button className="form-button" type="submit">
            Send Password Reset Email
          </button>
        </>
      )}

      {message === "success_email" && (
        <>
          <label htmlFor="email">code:</label>
          <input
            className="form-input"
            type="text"
            id="code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          {errorMessage && <p className="error"> {errorMessage} </p>}
          <br />
          <button className="form-button" type="submit">
            validate Code
          </button>
        </>
      )}

      {message === "success_code" && (
        <>
          <label htmlFor="password">Password:</label>
          <input
            className="form-input"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
         
          <br />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            className="form-input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
           {errorMessage && <p className="error"> {errorMessage} </p>}
          <br />
          <button className="form-button" type="submit">
            change Password
          </button>
        </>
      )}
    </form>
  );
};

export default ForgotPassword;
