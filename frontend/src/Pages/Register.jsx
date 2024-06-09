import { Link } from "react-router-dom";
import { useRef } from "react";

const Register = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signup = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get form input values
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let data = { userName: name, email: email, password: password };
    console.log(data);
    fetch("https://localhost:44351/api/Auth/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User registered successfully.");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        } else {
          if (response.status === 400) {
            document.getElementById("errorMsg").style.display = "block";
            return;
          }
          console.error("Failed to register user.");
        }
      })
      .catch((error) => {
        alert("Error");
        console.error("Error:", error);
      });
  };
  return (
    <div className="center">
      <h1>Register</h1>
      <form method="post" onSubmit={signup}>
        <div className="txt_field">
          <input type="text" id="name" name="name" ref={nameRef} required />
          <span></span>
          <label>Name</label>
        </div>
        <div className="txt_field">
          <input type="email" id="email" name="email" ref={emailRef} required />
          <span></span>
          <label>Email</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Register" />
        <div className="signup_link">
          Already Registered? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
