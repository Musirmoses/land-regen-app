import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";

export default function Adopt() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrees();
  }, []);

  async function fetchTrees() {
    setLoading(true);
    const { data, error } = await supabase
      .from("trees")
      .select("*")
      .eq("adopted", false);

    if (!error) setTrees(data || []);
    setLoading(false);
  }

  async function adoptTree(id) {
    const { error } = await supabase
      .from("trees")
      .update({ adopted: true })
      .eq("id", id);

    if (!error) fetchTrees();
  }

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-green-700 text-white py-16 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-4">🌿 Adopt a Tree</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Join <span className="font-semibold">Land Regen</span> in restoring our planet — 
          one tree at a time. By adopting a tree, you’re empowering local communities and 
          advancing <strong>SDG 15: Life on Land</strong>.
        </p>
      </section>

      {/* Available Trees */}
      <section className="container mx-auto py-12 px-6">
        {loading ? (
          <p className="text-center text-lg text-green-700">Loading available trees...</p>
        ) : trees.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            🌳 All trees have been adopted! Check back soon for new restoration opportunities.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {trees.map((tree) => (
              <div
                key={tree.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-semibold text-green-800 mb-2">
                  {tree.species || "Unknown Species"}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  🌍 Location: {tree.latitude}, {tree.longitude}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  🌱 Planted by: {tree.planted_by || "Community Partner"}
                </p>
                <button
                  onClick={() => adoptTree(tree.id)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-5 py-2 rounded-lg transition-all"
                >
                  Adopt This Tree 🌿
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-600 border-t">
        © 2025 Land Regen — Growing together for a sustainable future 🌱
      </footer>
    </div>
  );
}

