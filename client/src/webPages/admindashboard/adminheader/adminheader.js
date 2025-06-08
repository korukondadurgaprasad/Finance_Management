import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adminheader.css";
import logoImage from "../../../Assets/Logo_hive.png";

const AdminHeaderPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="page-header">
      <div className="header-left">
        <div className="user-info">
          <img 
            src={logoImage} 
            alt="Finance Hive Logo" 
            className="logo-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150x50';
            }}
          />
          <span className="user-name">Admin Finance Hive</span>
        </div>
      </div>

      <button className="nav-toggle" onClick={toggleNav}>
        <span className="hamburger"></span>
      </button>

      <nav className={`header-nav ${isNavOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link to="/admindashboard" onClick={() => setIsNavOpen(false)}>
              Add Admins
            </Link>
          </li>
          <li>
            <Link to="/admindashboard/admins" onClick={() => setIsNavOpen(false)}>
              Admin Details
            </Link>
          </li>
          <li>
            <Link to="/admindashboard/lenders" onClick={() => setIsNavOpen(false)}>
              Lender Details
            </Link>
          </li>
          <li>
            <Link to="/admindashboard/borrowers" onClick={() => setIsNavOpen(false)}>
              Borrowed Details
            </Link>
          </li>
        </ul>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>LOG OUT</button>
    </header>
  );
};

export default AdminHeaderPage;