import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Menu, X } from "lucide-react";

function HomeButton() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // 🧠 Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🧱 Dropdown element
  const dropdown = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="fixed top-16 right-5 bg-white/20 backdrop-blur-lg 
                     border border-white/30 rounded-xl shadow-xl p-3 
                     flex flex-col items-start space-y-2 z-[9999999]"
          style={{
            pointerEvents: "auto",
            touchAction: "auto",
          }}
        >
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/");
            }}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 
                       text-white px-3 py-2 rounded-lg w-full justify-start text-sm"
          >
            <Home size={16} /> Home
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* 💻 Desktop + Tablet → Normal Home Button */}
      <button
        onClick={() => navigate("/")}
        className="hidden sm:flex fixed top-6 right-6 bg-blue-600 hover:bg-blue-700 
                   text-white px-4 py-2 rounded-full shadow-lg 
                   transition-all duration-200 items-center justify-center z-[9999]"
      >
        <Home size={18} className="mr-2" /> Home
      </button>

      {/* 📱 Mobile → Expandable Icon */}
      <div className="sm:hidden fixed top-4 right-4 z-[99999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white 
                     p-3 rounded-full shadow-lg transition-all duration-200 
                     flex items-center justify-center relative z-[100000]"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 🚀 Render dropdown outside stacking context */}
      {createPortal(dropdown, document.body)}
    </>
  );
}

export default HomeButton;
