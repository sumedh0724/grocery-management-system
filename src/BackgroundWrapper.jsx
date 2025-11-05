import React from "react";
import AppLogo from "./AppLogo";

function BackgroundWrapper({ children }) {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#c4aaaa] via-[#646f76] to-[#b91616] text-gray-100"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #1e1e1e, #2a2a2a)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen backdrop-blur-sm bg-white/5">
      <AppLogo/>
      {children}
      </div>
    </div>
  );
}

export default BackgroundWrapper;
