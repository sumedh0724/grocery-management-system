import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Menu, X } from "lucide-react";

function HomeButton() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 💻 For Tablet + Desktop → Normal Home Button (Top Right) */}
      <button
        onClick={() => navigate("/")}
        className="hidden sm:flex fixed top-6 right-6 bg-blue-600 hover:bg-blue-700 
                   text-white px-4 py-2 rounded-full shadow-lg 
                   transition-all duration-200 items-center justify-center z-50"
      >
        <Home size={18} className="mr-2" /> Home
      </button>

      {/* 📱 For Mobile → Expandable Menu (Top Right) */}
      <div className="sm:hidden fixed top-5 right-5 z-50">
        {/* Toggle Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white 
                     p-3 rounded-full shadow-lg transition-all duration-200 
                     flex items-center justify-center"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Expandable Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-14 right-0 bg-white/10 backdrop-blur-md 
                         border border-white/20 rounded-xl shadow-xl p-3 
                         flex flex-col items-start space-y-2"
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
      </div>
    </>
  );
}

export default HomeButton;
