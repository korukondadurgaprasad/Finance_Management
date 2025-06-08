import { Route, Routes } from "react-router-dom";
import LenderListPage from "./lenderlist/Lenderlist";
import BorrowerNavPage from "./borrownav/Borrowernav";
import "./Borrowerdash.css";

const BorrowerDashboardPage = () => {
  return (
    <>
      <BorrowerNavPage />
      <main className="admin-content">
        <Routes>
          <Route path="/" element={<LenderListPage />} />
        </Routes>
      </main>
    </>
  );
};

export default BorrowerDashboardPage;
