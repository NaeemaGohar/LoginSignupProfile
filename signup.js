import React, { useState } from "react";

export const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email or password is empty
    if (!email || !pass || !name || !confirmPass) {
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

    // Check if password and confirm password match
    if (pass !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }

    const user = {
      email,
      password: pass,
      name,
    };

    // Store user data in local storage
    localStorage.setItem("user", JSON.stringify(user));

    // Display success message
    setShowMessage(true);

    // Redirect to login page after a short delay (e.g., 2 seconds)
    setTimeout(() => {
      props.onSignup(user);
      setShowMessage(false);
      props.onFormSwitch("Login"); // Redirect to login page
    }, 2000);
  };

  return (
    <div className="auth-form-container">
      <h2>SignUp</h2>
      {showMessage && (
        <div className="message">Registration successful! Redirecting...</div>
      )}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="FullName"
          id="name"
          name="Full Name"
        />
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
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="********"
          id="confirm-password"
          name="Confirm Password"
        />
        <button type="submit">SignUp</button>
      </form>
      {error && (
        <div className="error-message" title={error}>
          {error}
        </div>
      )}
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("Login")}
      >
        Already have an account? Login here.
      </button>
    </div>
  );
};
