// App.js
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./webPages/layout/Layout";

// Import Page Components
import HomePage from "./webPages/home/Home";
import ContactPage from "./webPages/contact/Contact";
import AboutPage from "./webPages/about/About";
import FeaturePage from "./webPages/feature/Feature";
import LoginPage from "./webPages/login/Log";
import SignUpPage from "./webPages/sign/Signup";
import UserDashboardPage from "./webPages/userdashboard/Dash";
import AdminDashboardPage from "./webPages/admindashboard/Admindash";
import BorrowerDashboardPage from "./webPages/borrowersdashboard/Borrowerdash";

// Create a wrapper component for Layout to handle Outlet
const LayoutWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/userdashboard/*" element={<UserDashboardPage />} />
          <Route path="/borrowersdashboard/*" element={<BorrowerDashboardPage />} />
          <Route 
            path="/admindashboard/*" 
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />

          {/* Routes with Layout */}
          <Route element={<LayoutWrapper />}>
            <Route index element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/feature" element={<FeaturePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;