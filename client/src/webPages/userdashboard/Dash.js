// import React, { useState, useEffect } from "react";
// import { Routes, Route, Link, useLocation } from "react-router-dom";
// import PiePage from "../analytics/Pie";
// import AddCustomerPage from "../addcustomer/Addcustomer";
// import AddTransactionPage from "../addtransaction/Adddata";
// import CustomerDetailsPage from "../customerdetails/Details";
// import GetTransactionPage from "../gettransaction/List";
// import TransactionDetailsPage from "../transactiondetails/Transaction"; // New import
// import HeaderPage from "./header";
// import "./Dash.css";

// const UserDashboardPage = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
//   const location = useLocation();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         window.innerWidth <= 768 &&
//         !event.target.closest('.user-interface-dashboard__sidebar-wrapper') &&
//         !event.target.closest('.user-interface-dashboard__menu-toggle-button')
//       ) {
//         setIsSidebarOpen(false);
//       }
//     };

//     const handleResize = () => {
//       setIsSidebarOpen(window.innerWidth > 768);
//     };

//     setIsSidebarOpen(window.innerWidth > 768);

//     document.addEventListener('mousedown', handleClickOutside);
//     window.addEventListener('resize', handleResize);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [location.pathname]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const closeSidebarOnMobile = () => {
//     if (window.innerWidth <= 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const navigationLinks = [
//     { to: "/userdashboard", label: "Dashboard" },
//     { to: "/userdashboard/addcustomer", label: "Add Customers" },
//     { to: "/userdashboard/addtransaction", label: "Add Transactions" },
//     { to: "/userdashboard/customerdetails", label: "Customer Details" },
//     { to: "/userdashboard/gettransaction", label: "Get List" },
//     { to: "/userdashboard/transactiondetails", label: "Transaction Details" } // New navigation link
//   ];

//   return (
//     <div className="user-interface-dashboard__main-container" id="userdashboard">
//       <header className="user-interface-dashboard__header-section">
//         <button 
//           className="user-interface-dashboard__menu-toggle-button" 
//           onClick={toggleSidebar}
//           aria-label="Toggle Menu"
//         >
//           ☰
//         </button>
//         <HeaderPage />
//       </header>

//       <div 
//         className={`user-interface-dashboard__overlay-background ${
//           isSidebarOpen ? 'user-interface-dashboard__overlay-background--visible' : ''
//         }`}
//         onClick={closeSidebarOnMobile}
//       />

//       <aside className={`user-interface-dashboard__sidebar-wrapper ${
//         isSidebarOpen ? 'user-interface-dashboard__sidebar-wrapper--expanded' : ''
//       }`}>
//         <h2 className="user-interface-dashboard__sidebar-heading">USER</h2>
//         <nav className="user-interface-dashboard__navigation-container">
//           <ul className="user-interface-dashboard__navigation-list">
//             {navigationLinks.map((link) => (
//               <li key={link.to} className="user-interface-dashboard__navigation-item">
//                 <Link 
//                   to={link.to} 
//                   className={`user-interface-dashboard__navigation-link ${
//                     location.pathname === link.to ? 'user-interface-dashboard__navigation-link--active' : ''
//                   }`}
//                   onClick={closeSidebarOnMobile}
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       <main className="user-interface-dashboard__content-section">
//         <Routes>
//           <Route index element={<PiePage />} />
//           <Route path="addcustomer" element={<AddCustomerPage />} />
//           <Route path="addtransaction" element={<AddTransactionPage />} />
//           <Route path="customerdetails" element={<CustomerDetailsPage />} />
//           <Route path="gettransaction" element={<GetTransactionPage />} />
//           <Route path="transactiondetails" element={<TransactionDetailsPage />} /> {/* New route */}
//         </Routes>
//       </main>
//     </div>
//   );
// };

// export default UserDashboardPage;

import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import PiePage from "../analytics/Pie";
import AddCustomerPage from "../addcustomer/Addcustomer";
import AddTransactionPage from "../addtransaction/Adddata";
import CustomerDetailsPage from "../customerdetails/Details";
import GetTransactionPage from "../gettransaction/List";
import TransactionDetailsPage from "../transactiondetails/Transaction";
import HeaderPage from "./header";
import "./Dash.css";

const UserDashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth <= 768 &&
        !event.target.closest('.user-interface-dashboard__sidebar-wrapper') &&
        !event.target.closest('.toggle-menu-button')
      ) {
        setIsSidebarOpen(false);
      }
    };

    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    setIsSidebarOpen(window.innerWidth > 768);

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const navigationLinks = [
    { to: "/userdashboard", label: "Dashboard" },
    { to: "/userdashboard/addcustomer", label: "Add Customers" },
    { to: "/userdashboard/addtransaction", label: "Add Transactions" },
    { to: "/userdashboard/customerdetails", label: "Customer Details" },
    { to: "/userdashboard/gettransaction", label: "Get List" },
    { to: "/userdashboard/transactiondetails", label: "Transaction Details" }
  ];

  return (
    <div className="user-interface-dashboard__main-container" id="userdashboard">
      <HeaderPage toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div 
        className={`user-interface-dashboard__overlay-background ${
          isSidebarOpen ? 'user-interface-dashboard__overlay-background--visible' : ''
        }`}
        onClick={closeSidebarOnMobile}
      />

      <aside className={`user-interface-dashboard__sidebar-wrapper ${
        isSidebarOpen ? 'user-interface-dashboard__sidebar-wrapper--expanded' : ''
      }`}>
        <h2 className="user-interface-dashboard__sidebar-heading">USER</h2>
        <nav className="user-interface-dashboard__navigation-container">
          <ul className="user-interface-dashboard__navigation-list">
            {navigationLinks.map((link) => (
              <li key={link.to} className="user-interface-dashboard__navigation-item">
                <Link 
                  to={link.to} 
                  className={`user-interface-dashboard__navigation-link ${
                    location.pathname === link.to ? 'user-interface-dashboard__navigation-link--active' : ''
                  }`}
                  onClick={closeSidebarOnMobile}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className={`user-interface-dashboard__content-section ${
        isSidebarOpen ? '' : 'user-interface-dashboard__content-section--expanded'
      }`}>
        <Routes>
          <Route index element={<PiePage />} />
          <Route path="addcustomer" element={<AddCustomerPage />} />
          <Route path="addtransaction" element={<AddTransactionPage />} />
          <Route path="customerdetails" element={<CustomerDetailsPage />} />
          <Route path="gettransaction" element={<GetTransactionPage />} />
          <Route path="transactiondetails" element={<TransactionDetailsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default UserDashboardPage;