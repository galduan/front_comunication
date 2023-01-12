import React, { useState } from "react";
import {
  changePassword,
} from "../api";
import "./ForgotPassword.css";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
  const [passwordOld, setPasswordOld] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const cookies = new Cookies();
  const history = useHistory();
  const user = cookies.get("userName");
  const handleSubmit = (event) => {
    event.preventDefault();
    changePassword(user, passwordOld, newPassword, confirmPassword).then((res)=>{
        if(!res.data.error){
            history.push('/')
            window.location.reload(false);
        }else{
            setErrorMessage(res.data.error)
        }
    })

};

  return (
    <form className="forgot-password-form" onSubmit={handleSubmit}>
      <>
        <label htmlFor="password">Old Password:</label>
        <input
          className="form-input"
          type="password"
          id="passwordOld"
          value={passwordOld}
          onChange={(event) => setPasswordOld(event.target.value)}
        />

        <label htmlFor="password">New Password:</label>
        <input
          className="form-input"
          type="password"
          id="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
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
    </form>
  );
};
export default ChangePassword;
