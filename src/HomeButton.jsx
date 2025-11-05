import React from "react";
import { Link } from "react-router-dom";

function HomeButton() {
  return (
    <Link
      to="/"
      className="absolute top-7 right-20 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-200 z-50"
      title="Go to Home"
    >
      🏠 Home
    </Link>
  );
}

export default HomeButton;
