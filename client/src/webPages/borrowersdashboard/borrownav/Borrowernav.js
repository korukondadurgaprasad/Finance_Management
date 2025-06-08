import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Borrowernav.css";
import profilePic from "../../../Assets/Userprofile.png";

const BorrowerNavPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle logout
  const handleLogout = () => {
    // Perform any additional logout logic here (e.g., clearing localStorage, tokens, etc.)
    localStorage.removeItem("accessToken"); // Example: Clear the authentication token
    navigate("/login"); // Navigate to the login page
  };

  return (
    <header className="admin-header-container__main">
      <div className="admin-header-container__user-wrapper">
        <div
          className="admin-header-container__profile-image"
          style={{
            backgroundImage: `url(${profilePic})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <span className="admin-header-container__username">Borrower Dashboard</span>
      </div>
      <button
        className="admin-header-container__logout-button"
        onClick={handleLogout} // Attach the logout handler to the button
      >
        LOG OUT
      </button>
    </header>
  );
};

export default BorrowerNavPage;