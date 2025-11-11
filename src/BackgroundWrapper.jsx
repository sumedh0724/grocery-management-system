import React from "react";
import { motion } from "framer-motion";
import AppLogo from "./AppLogo";

function BackgroundWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <AppLogo/>
      <div className="relative z-10 pt-20 px-4">{children}</div>
    </motion.div>
  );
}

export default BackgroundWrapper;
