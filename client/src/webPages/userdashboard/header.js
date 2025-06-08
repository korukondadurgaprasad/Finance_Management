// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./header.css";
// import profilePic from "../../Assets/Userprofile.png";

// const HeaderPage = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('userToken');
//     localStorage.clear();
//     navigate('/login');
//   };

//   return (
//     <div className="admin-header-container__main">
//       <div className="admin-header-container__user-wrapper">
//         <div className="admin-header-container__profile-image">
//           <img 
//             src={profilePic} 
//             alt="Profile" 
//             style={{width: '100%', height: '100%', borderRadius: '50%'}} 
//           />
//         </div>
//         <div className="admin-header-container__username">
//           Lender Dashboard
//         </div>
//       </div>
//       <button 
//         className="admin-header-container__logout-button" 
//         onClick={handleLogout}
//       >
//         LOG OUT
//       </button>
//     </div>
//   );
// };

// export default HeaderPage;


import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import profilePic from "../../Assets/Userprofile.png";

const HeaderPage = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="admin-header-container__main">
      <div className="admin-header-container__left-section">
        <button 
          className="toggle-menu-button" 
          onClick={toggleSidebar}
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>
        
        <div className="admin-header-container__user-wrapper">
          <div className="admin-header-container__profile-image">
            <img 
              src={profilePic} 
              alt="Profile" 
              style={{width: '100%', height: '100%', borderRadius: '50%'}} 
            />
          </div>
          <div className="admin-header-container__username">
            Lender Dashboard
          </div>
        </div>
      </div>
      
      <button 
        className="admin-header-container__logout-button" 
        onClick={handleLogout}
      >
        LOG OUT
      </button>
    </div>
  );
};

export default HeaderPage;