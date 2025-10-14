import React from "react";

export function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all ${className}`}
    >
      {children}
    </button>
  );
}
