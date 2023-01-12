import React, { useState } from "react";
import "./App.css";
import Cookies from "universal-cookie";
import { create_clients } from "./api";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [customer, setCustomer] = useState("");
  console.log(customer);
  const cookies = new Cookies();
  const isSafe = cookies.get("isSafe");
  const handleSubmit = (event) => {
    event.preventDefault();
    create_clients(firstName, lastName, isSafe)
      .then((res) => {
        // console.log(isSafe);
        // xss attack
        setCustomer(firstName + " " + lastName);
      })
      .catch((err) => {
        console.log(err);
      });
    // setCustomer(firstName+' '+lastName);
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
          ></input>
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
          ></input>
        </label>
        <br />
        <button type="submit">Save Customer</button>
        <div className="customer">
          <h2>Customer: </h2>

          {isSafe==="true" ? (
            customer
          ) : (
            <div
              security="false"
              dangerouslySetInnerHTML={{ __html: customer }}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Home;
