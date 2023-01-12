import React, { useState } from "react";
import "./App.css";
import Cookies from "universal-cookie";
import { create_clients } from "./api";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [customer, setCustomer] = useState("");
  const cookies = new Cookies();

  const handleSubmit = (e) => {
    create_clients(firstName, lastName, cookies.get("isSafe")).then((res) => {
      console.log(res.data.id);
      setCustomer(res.data.firstName + res.data.lastName);
    });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
            required
          />
        </label>
        <br />
        <button type="submit">Save Customer</button>

        <div className="customer-list">
          <h2>Customer: </h2>

          <li>
            {customer}
          </li>
        </div>
      </form>
    </div>
  );
};

export default Home;
