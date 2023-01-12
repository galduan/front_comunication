import React, { useState } from "react";
import "./ToggleButton.css";
import Cookies from "universal-cookie";

const ToggleButton = () => {
  const cookies = new Cookies();
  console.log(cookies.get("isSafe")==='true');
  const [isSecure, setIsSecure] = useState(cookies.get("isSafe")==='true');
  return (
    <div className="toggle-button-container">
      <button
        className={`toggle-button ${isSecure ? "secure" : "not-secure"}`}
        onClick={() => {
          cookies.set("isSafe", !isSecure, { path: "/" })
          setIsSecure(!isSecure);
        }}
      >
        {isSecure ? "Secure" : "Not Secure"}
      </button>
    </div>
  );
};

export default ToggleButton;
