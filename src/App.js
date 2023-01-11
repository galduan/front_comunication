import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import ForgotPassword from "./Pages/ForgetPassword";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";
import "./App.css";

import Cookies from "universal-cookie";
import { logout } from "./api";
import { useHistory } from "react-router-dom";
import ChangePassword from "./Pages/ChangePassword";

function App() {
  const cookies = new Cookies();
  const history = useHistory();

  function refreshPage() {
    window.location.reload(false);
  }

  if (cookies.get("isAuthenticated") === "true") {
    return (
      <div>
        <nav className="nav-bar">
          <ul>
            <li>
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>

            <li>
              <Link className="nav-link" to="/change-password">
                change Password
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                onClick={() => {
                  logout();
                  cookies.set("isAuthenticated", false, { path: "/" });
                  history.push("/");
                  refreshPage()
                }}
              >
                logout
              </Link>
            </li>
          </ul>
        </nav>
        <br />

        <Switch>
          <Route path="/home" component={Home} exact />
          <Route path="/change-password" component={ChangePassword} exact />
        </Switch>
      </div>
    );
  } else {
    return (
      <div>
        <nav className="nav-bar">
          <ul>
            <li>
              <Link className="nav-link" to="/">
                Sign In
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/forget-password">
                Forgot Password
              </Link>
            </li>
          </ul>
        </nav>
        <br />

        <Switch>
          <Route path="/" component={SignIn} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/forget-password" component={ForgotPassword} exact />
        </Switch>
      </div>
    );
  }
}

export default App;
