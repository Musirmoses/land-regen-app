import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 text-gray-800 p-6">
      {/* Header Section */}
      <div className="text-center max-w-3xl mb-10">
        <h1 className="text-5xl font-extrabold text-green-800 mb-4">
          🌱 Land Regen
        </h1>
        <p className="text-xl text-gray-700">
          Reclaiming our planet — one root at a time.
        </p>
        <p className="mt-2 text-gray-600">
          Join us in restoring life to the land, empowering communities,
          and advancing SDG 15: Life on Land.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-green-700 text-white rounded-2xl shadow-md hover:bg-green-800 transition"
        >
          🌍 Dashboard
        </button>
        <button
          onClick={() => navigate("/plant")}
          className="px-6 py-3 bg-green-500 text-white rounded-2xl shadow-md hover:bg-green-600 transition"
        >
          🌱 Plant a Tree
        </button>
        <button
          onClick={() => navigate("/adopt")}
          className="px-6 py-3 bg-emerald-400 text-white rounded-2xl shadow-md hover:bg-emerald-500 transition"
        >
          🌿 Adopt a Tree
        </button>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl text-center bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Land Regen is a digital ecosystem built to track, visualize, and sustain
          land restoration projects. By connecting planters, organizations, and
          environmental champions, we drive verified, community-led regeneration
          efforts — blending technology and impact for a greener tomorrow.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-4 border-l-4 border-green-500">
            <h3 className="font-semibold text-green-700 mb-2">
              🌍 Track Restoration
            </h3>
            <p className="text-sm text-gray-600">
              Visualize restoration sites on dynamic maps and monitor their
              progress over time.
            </p>
          </div>
          <div className="p-4 border-l-4 border-green-500">
            <h3 className="font-semibold text-green-700 mb-2">
              🌱 Empower Planters
            </h3>
            <p className="text-sm text-gray-600">
              Provide tools for local communities and organizations to showcase
              verified impact.
            </p>
          </div>
          <div className="p-4 border-l-4 border-green-500">
            <h3 className="font-semibold text-green-700 mb-2">
              🌿 Adopt Trees
            </h3>
            <p className="text-sm text-gray-600">
              Support ongoing reforestation projects by adopting trees and
              contributing to their care.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-600">
        © 2025 Land Regen — Growing together for a sustainable future 🌱
      </footer>
    </div>
  );
}
