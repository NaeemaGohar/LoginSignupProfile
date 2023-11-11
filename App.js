import logo from './logo.svg';
import './App.css';
import react, {useState} from "react"
import {Login} from "./components/login/login.js"
import {SignUp} from "./components/signup/signup.js"
import {Profile} from "./components/profile/profile.js"

// ... (imports)

function App() {
  const [currentForm, setCurrentForm] = useState('Login');
  const [loggedInUser, setLoggedInUser] = useState(getUserFromStorage());

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const handleLogin = (user) => {
    setLoggedInUser(user);
    setCurrentForm("Profile");
    storeUserInStorage(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentForm("Login");
    clearUserFromStorage();
  };

  // Function to get user from local storage
  function getUserFromStorage() {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  // Function to store user in local storage
  function storeUserInStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Function to clear user from local storage
  function clearUserFromStorage() {
    localStorage.removeItem('user');
  }

  return (
    <div className="App">
      {currentForm === "Login" && (
        <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
      )}
      {currentForm === "SignUp" && (
        <SignUp onFormSwitch={toggleForm} onSignup={handleLogin} />
      )}
      {currentForm === "Profile" && (
        <Profile userData={loggedInUser} onFormSwitch={handleLogout} />
      )}
    </div>
  );
}

export default App;
