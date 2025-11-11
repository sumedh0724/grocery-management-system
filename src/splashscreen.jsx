import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // 2.5 seconds visible
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white z-[9999] overflow-hidden"
      >
        {/* Background Glow Effects */}
        <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl top-1/3 left-1/3 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-1/3 right-1/3 animate-pulse"></div>

        {/* TEXT LOGO — mimics your uploaded design */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-5xl font-extrabold text-center"
        >
          <span className="text-white drop-shadow-lg">Grocery</span>{" "}
          <span className="bg-gradient-to-r from-blue-400 to-sky-500 bg-clip-text text-transparent drop-shadow-md">
            Management
          </span>{" "}
          <span className="text-gray-300 font-medium tracking-wide">
            System
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-4 text-gray-400 text-sm sm:text-base"
        >
          Simplify • Manage • Grow
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}

export default SplashScreen;
