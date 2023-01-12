import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../api";
import "./SignIn.css";
import Cookies from "universal-cookie";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const cookies = new Cookies();
  // console.log(cookies.get('isAuthenticated'));
  const handleSubmit = (event) => {
    event.preventDefault();
    cookies.set("isAuthenticated", false, { path: "/" });
    cookies.set("attemps_number", 0, { path: "/" });
    cookies.set("userName", "", { path: "/" });
    login(username, password, cookies.get("isSafe"))
      .then((res) => {
        if (res.data.success) {
          cookies.set("isAuthenticated", true, { path: "/" });
          cookies.set("userName", username, { path: "/" });

          history.push("/home");
          window.location.reload(false);
        } else {
          if (res.data.unSafe) {
            setErrorMessage(res.data.error + ", " + res.data.unSafe);
          } else {
            setErrorMessage(res.data.error);
          }
        }
      })
      .catch((err) => {
        console.log(err, "xxxxxx");
      });
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <h1>Sign In Here: </h1>
      <label htmlFor="username">Username:</label>
      <input
        className="form-input"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        className="form-input"
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {errorMessage && <p className="error"> {errorMessage} </p>}
      <br />

      <Link className="form-forgot-password" to="/forget-password">
        Forgot Password
      </Link>

      <br />
      <button className="form-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default SignIn;
