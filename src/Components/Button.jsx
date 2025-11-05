// GradientButton.jsx
import React from "react";

export default function GradientButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        px-6 py-2 
        rounded-lg 
        font-semibold 
        text-white 
        bg-gradient-to-r from-pink-500 to-blue-500
        hover:from-pink-600 hover:to-blue-600
        transition-all duration-300
        shadow-md hover:shadow-lg
        hover:scale-105
      "
    >
      {children}
    </button>
  );
}
