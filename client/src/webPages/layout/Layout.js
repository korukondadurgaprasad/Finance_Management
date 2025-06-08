import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import StickyIcons from "../../components/sticky/Sticky";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <Navbar />
      </header>

      <main className="layout-main">
        <div className="layout-content">
          <Outlet /> {/* This will render the matched child route */}
        </div>
        <StickyIcons />
      </main>

      <footer className="layout-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;