import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 flex justify-between items-center px-6 py-3 z-50">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-300 font-extrabold text-xl cursor-pointer tracking-wide"
      >
        🛒 <span className="text-white">Grocery IMS</span>
      </div>

      {/* Home / Logout Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow"
        >
          Home
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
            navigate("/login", { replace: true });
          }}
          className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold shadow"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
