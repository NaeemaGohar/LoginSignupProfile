import React, { useState } from "react";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email or password is empty
    if (!email || !pass) {
      setError("All fields are required.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    // Validate password format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(pass)) {
      setError(
        "Invalid password format. It should be at least 8 characters long and contain one uppercase, one lowercase, a number, and a special character.\nPlease check your password and try again."
      );
      return;
    }

    // Retrieve stored signup data from local storage
    const storedUserString = localStorage.getItem("user");

    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);

      // Check if the entered email and password match the signed-up user
      if (storedUser.email === email && storedUser.password === pass) {
        // If the email and password match, proceed to the profile page
        props.onLogin(storedUser);
      } else {
        // If the email and password do not match, display an error message
        setError("User is not registered. Please sign up.");
      }
    } else {
      setError("User is not registered. Please sign up.");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="username@gmail.com"
          id="email"
          name="Email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="********"
          id="password"
          name="Password"
        />
        <button type="submit">Login</button>
      </form>
      {error && (
        <div className="error-message" title={error}>
          {error}
        </div>
      )}
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("SignUp")}
      >
        Don't have an account? Register here.
      </button>
      {/* Link to the Signup page */}
      <p>
        New user?{' '}
        <a
          href="/signup"
          onClick={(e) => {
            e.preventDefault();
            props.onFormSwitch('SignUp');
          }}
        >
          Signup here
        </a>
        .
      </p>
    </div>
  );
};
