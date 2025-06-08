// AdminDashboardPage.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import AddAdminmemPage from "./addadminmem/Addadmins";
import AdminListPage from "./admindetail/Adminlist";
import LenderMembersPage from "./adminLenderdetail/Lendermem";
import BorrowedMembersPage from './adminBorrowermem/Borrowers';
import AdminHeaderPage from "./adminheader/adminheader";
import './Admindash.css';

const AdminDashboardPage = () => {
  return (
    <div className="admin-app">
      <AdminHeaderPage />
      <main className="admin-content">
        <Routes>
          <Route index element={<AddAdminmemPage />} />
          <Route path="admins" element={<AdminListPage />} />
          <Route path="lenders" element={<LenderMembersPage />} />
          <Route path="borrowers" element={<BorrowedMembersPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboardPage;