import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundWrapper from "./BackgroundWrapper";
import HomeButton from "./HomeButton";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        {/* 🛒 Dashboard Title */}
        <h1 className="text-4xl font-extrabold text-blue-400 mb-12 drop-shadow-lg flex items-center gap-3">
          <span role="img" aria-label="cart" className="text-5xl">🛒</span>
          <span>Dashboard</span>
        </h1>

        {/* 🔹 2×2 Button Grid */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          <button
            onClick={() => navigate("/generate-bill")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            📄 Generate Bill
          </button>

          <button
            onClick={() => navigate("/stock")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            📦 View Stock
          </button>

          <button
            onClick={() => navigate("/transactions")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            🧾 Transaction History
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              window.location.href = "/login";
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            🔒 Logout
          </button>
        </div>

        <HomeButton />
      </div>
    </BackgroundWrapper>
  );
}

export default Dashboard;
