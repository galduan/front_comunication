import React, { useState } from "react";
import "./Register.css";
import { regiserUser } from "../api";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const cookies = new Cookies();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (password !== passwordRepeat) {
      setErrorMessage('The passwords do not match, please try again.');
    } else {
      // Perform registration here
      console.log(email, username, password, firstName, lastName, cookies.get("isSafe"));
      regiserUser(
        email,
        password,
        passwordRepeat,
        firstName,
        lastName,
        username,
        cookies.get("isSafe")
      )
        .then((res) => {
          if (!res.data.error) {
            cookies.set("isAuthenticated", true, { path: "/" });
            cookies.set("userName", res.data.userName, { path: "/" });
            history.push("/");
            window.location.reload(false);
          } else {
            if (res.data.unSafe) {
              setErrorMessage(res.data.error + ", " + res.data.unSafe);
            } else {
              setErrorMessage(res.data.error);
            }
          }
        })
        .catch((err) => {});
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Repeat Password:
          <input
            type="password"
            value={passwordRepeat}
            onChange={(event) => setPasswordRepeat(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </label>
        {errorMessage && <p className="error"> {errorMessage} </p>}
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
