import React from "react";

function AppLogo() {
  return (
    <div className="fixed top-4 left-6 flex items-center gap-3 z-50 select-none">
      {/* Minimal Symbol */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-blue-400 font-extrabold text-xl rounded-lg w-11 h-11 flex items-center justify-center shadow-lg shadow-blue-900/40 transition-transform duration-300 hover:scale-105">
        🛍️
      </div>

      {/* Brand Text */}
      <h1 className="text-gray-100 text-2xl font-[700] tracking-tight leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] font-sans">
        <span className="font-bold text-white">Grocery</span>
        <span className="text-blue-400 font-semibold"> Management</span>{" "}
        <span className="text-gray-300 font-light">System</span>
      </h1>
    </div>
  );
}

export default AppLogo;
