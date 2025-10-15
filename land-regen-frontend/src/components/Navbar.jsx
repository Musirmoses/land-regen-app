import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Plant a Tree", path: "/plant" },
    { name: "Adopt a Tree", path: "/adopt" },
  ];

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-green-700 tracking-tight hover:text-green-800 transition"
        >
          Land Regen
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium transition ${
                location.pathname === item.path
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu (optional future enhancement) */}
        <div className="md:hidden">
          <button
            onClick={() => alert("Mobile menu coming soon!")}
            className="text-green-700"
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
