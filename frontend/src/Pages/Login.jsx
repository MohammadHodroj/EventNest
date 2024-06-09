/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("none");

  const login = (e) => {
    e.preventDefault();

    let data = { email: email, password: password };
    console.log(data);
    fetch("https://localhost:44351/api/Auth/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          if (response.status == 400) {
            setErrorMsg("block");
            return Promise.reject("Invalid email or password");
          }
          console.error("Failed to login.");
          return Promise.reject("Failed to login");
        }
      })
      .then((text) => {
        if (text === "incorrect email or password") {
          setErrorMsg("block");
          document.getElementById("errorMsg").innerHTML =
            "Incorrect Email or Password";
          return;
        }
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("login", true);
        sessionStorage.setItem("userId", text.split("$")[1]);
        sessionStorage.setItem("isadmin", text.split("$")[2]);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        console.log("Response Text:", text);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  console.log("Login component rendered");
  return (
    <>
      {/* <div className="login" id="login">
        <form action="" className="login__form">
          <h2 className="login__title">Log In</h2>

          <div className="login__group">
            <div>
              <label htmlFor="email" className="login__label">
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login__input"
              />
            </div>

            <div>
              <label htmlFor="password" className="login__label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login__input"
              />
            </div>
          </div>

          <div>
            <p className="login__signup">
              You do not have an account? <Link to="#">Sign up</Link>
            </p>

            <button onClick={login} className="login__button">
              Log In
            </button>
          </div>
        </form>
      </div> */}
      <div className="center">
        <h1>Login</h1>
        <form method="post" onSubmit={login}>
          <div className="txt_field">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span></span>
            <label>Password</label>
          </div>
          <input type="submit" value="Login" />
          <div className="signup_link">
            Not a member? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
