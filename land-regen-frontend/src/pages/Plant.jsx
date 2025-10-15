import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

export default function Plant() {
  const [trees, setTrees] = useState([]);
  const [newTree, setNewTree] = useState({ species: "", latitude: "", longitude: "", planted_by: "" });
  const [tokens, setTokens] = useState(0);
  const [activePlanters, setActivePlanters] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🌱 Fetch trees and community stats
  useEffect(() => {
    fetchTrees();
    fetchCommunityData();
  }, []);

  async function fetchTrees() {
    const { data, error } = await supabase.from("trees").select("*").order("created_at", { ascending: false });
    if (!error) setTrees(data);
  }

  async function fetchCommunityData() {
    const { data, error } = await supabase.from("trees").select("planted_by");
    if (!error && data) {
      const uniquePlanters = new Set(data.map((t) => t.planted_by)).size;
      setActivePlanters(uniquePlanters);
      setTokens(data.length * 5); // 🎁 5 tokens per tree globally
    }
  }

  // 🌍 Plant a new tree
  async function handlePlant(e) {
    e.preventDefault();
    if (!newTree.species || !newTree.latitude || !newTree.longitude || !newTree.planted_by) {
      alert("Please fill out all fields");
      return;
    }
    setLoading(true);

    const { data, error } = await supabase.from("trees").insert([newTree]).select();
    setLoading(false);

    if (error) {
      alert("Failed to save tree");
      console.error(error);
    } else {
      setTrees((prev) => [data[0], ...prev]);
      setTokens((t) => t + 10); // 🎉 10 tokens for each new tree
      setNewTree({ species: "", latitude: "", longitude: "", planted_by: "" });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-gray-800">
      {/* Header */}
      <motion.div
        className="text-center py-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-green-700">🌳 Plant a Tree, Earn Tokens</h1>
        <p className="text-lg text-gray-600 mt-2">
          Join our reforestation effort — every tree counts toward a greener Earth.
        </p>
      </motion.div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10 text-center">
        <div className="bg-green-700 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold">{trees.length}</h2>
          <p>Trees Planted</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold">{activePlanters}</h2>
          <p>Active Planters</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold">{tokens}</h2>
          <p>Green Tokens Earned</p>
        </div>
      </div>

      {/* Planting Form */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-green-700">Add New Tree 🌱</h3>
        <form onSubmit={handlePlant} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Tree Species"
            value={newTree.species}
            onChange={(e) => setNewTree({ ...newTree, species: e.target.value })}
            className="p-2 border rounded focus:ring focus:ring-green-200"
          />
          <input
            type="text"
            placeholder="Planted By"
            value={newTree.planted_by}
            onChange={(e) => setNewTree({ ...newTree, planted_by: e.target.value })}
            className="p-2 border rounded focus:ring focus:ring-green-200"
          />
          <input
            type="text"
            placeholder="Latitude"
            value={newTree.latitude}
            onChange={(e) => setNewTree({ ...newTree, latitude: e.target.value })}
            className="p-2 border rounded focus:ring focus:ring-green-200"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={newTree.longitude}
            onChange={(e) => setNewTree({ ...newTree, longitude: e.target.value })}
            className="p-2 border rounded focus:ring focus:ring-green-200"
          />
          <button
            type="submit"
            className="col-span-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
            disabled={loading}
          >
            {loading ? "Planting..." : "Plant Tree 🌿"}
          </button>
        </form>
      </div>

      {/* Tree List */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <h3 className="text-xl font-bold text-green-700 mb-4">Recently Planted Trees</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {trees.length === 0 ? (
            <p className="text-gray-500">No trees planted yet. Be the first to plant one!</p>
          ) : (
            trees.map((tree) => (
              <motion.div
                key={tree.id}
                className="bg-white p-4 rounded-lg shadow-md border border-green-100"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-lg text-green-800">{tree.species}</h4>
                <p className="text-sm text-gray-600">
                  <strong>By:</strong> {tree.planted_by}
                </p>
                <p className="text-sm text-gray-500">
                  📍 {tree.latitude}, {tree.longitude}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
