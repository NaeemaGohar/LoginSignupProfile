// Profile.js
import React, { useState } from "react";

export const Profile = (props) => {
  const { email = "", name: initialName = "" } = props.userData || {};
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const [isNameEdited, setIsNameEdited] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the updated name and call the callback to update the Full Name in signup data
    setIsEditing(false);

    // Check if the callback function is provided before calling it
    if (props.onProfileUpdate) {
      props.onProfileUpdate({ ...props.userData, name });
    }

    // Display a message (you can replace this with your desired logic)
    alert("Name edited!");

    // Optionally, update the local state to reflect the edited name
    setName(name);
  };

  const handleCancelClick = () => {
    // Cancel the edit and revert to the initial name
    setIsEditing(false);
    setName(initialName);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {isNameEdited && <p>Name edited successfully!</p>}
      <div className="profile-info">
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Name:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Full Name"
            />
          ) : (
            name
          )}
        </p>
      </div>
      {isEditing ? (
        <div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={handleEditClick}>Edit</button>
          <button
            className="link-btn"
            onClick={() => props.onFormSwitch("Login")}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
