import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackgroundWrapper from "./BackgroundWrapper";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <BackgroundWrapper>
      {/* <Navbar /> */}

      {/* 👇 Main Content Area */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 min-h-[calc(100vh-6rem)] overflow-hidden"
      >
        {/* 🏷️ Title */}
        <h1 className="text-4xl font-extrabold text-blue-400 mb-10 drop-shadow-lg flex items-center gap-3">
          🛒 <span>Dashboard</span>
        </h1>

        {/* 🔹 2×2 Button Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
          <button
            onClick={() => navigate("/generate-bill")}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transition-transform text-white font-semibold py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            📄 Generate Bill
          </button>

          <button
            onClick={() => navigate("/stock")}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-transform text-white font-semibold py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            📦 View Stock
          </button>

          <button
            onClick={() => navigate("/transactions")}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:scale-105 transition-transform text-white font-semibold py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            🧾 Transaction History
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              navigate("/login", { replace: true });
            }}
            className="bg-gradient-to-r from-red-500 to-rose-600 hover:scale-105 transition-transform text-white font-semibold py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            🔒 Logout
          </button>
        </div>

        {/* Footer Padding for Mobile */}
        <div className="h-10 sm:h-0"></div>
      </motion.div>
    </BackgroundWrapper>
  );
}

export default Dashboard;
