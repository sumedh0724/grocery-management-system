import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundWrapper from "./BackgroundWrapper";

function LoginPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") { // change to your actual password
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      alert("❌ Incorrect password. Try again.");
    }
  };

  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-white px-4">
        {/* 🏷️ Project Name */}
        <h1 className="text-4xl font-bold text-blue-400 drop-shadow-lg mb-10">
          🛒 Grocery Inventory Management System
        </h1>

        {/* 🔐 Login Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-6 text-blue-300">Admin Login</h2>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-2 mb-4 text-gray-900 rounded border border-gray-400"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all"
          >
            Login
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-gray-300 text-sm">
          © {new Date().getFullYear()} Grocery IMS — All Rights Reserved
        </p>
      </div>
    </BackgroundWrapper>
  );
}

export default LoginPage;
