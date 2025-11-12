import React from "react";

function AppLogo() {
  return (
    <div className="fixed top-3 left-4 flex flex-wrap items-center gap-3 z-[9999] select-none pointer-events-none">
      {/* 🛍️ Icon */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 text-blue-400 font-extrabold text-xl rounded-xl w-11 h-11 flex items-center justify-center shadow-lg shadow-blue-900/30 transition-transform duration-300 hover:scale-105">
        🛍️
      </div>

      {/* 🏷️ Brand Name (hide only for extra-small screens < 375px) */}
      <h1
        className="text-gray-100 text-[1.35rem] sm:text-2xl font-[700] tracking-tight leading-tight 
                   drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] font-sans 
                   inline-block whitespace-normal break-words 
                   max-[374px]:hidden"
      >
        <span className="font-bold text-white">Grocery</span>
        <span className="text-blue-400 font-semibold ml-1">Management</span>{" "}
        <span className="text-gray-300 font-light">System</span>
      </h1>
    </div>
  );
}

export default AppLogo;
