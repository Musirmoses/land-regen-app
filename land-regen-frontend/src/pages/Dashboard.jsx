import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Leaf, TreePine, Users } from "lucide-react";
import { Button } from "@/components/button";
import { fetchTrees, addTree } from "../lib/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [trees, setTrees] = useState([]);
  const [newTree, setNewTree] = useState({ lat: "", lng: "", planter: "" });
  const [tokens, setTokens] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingTrees, setLoadingTrees] = useState(true);

  // 🌱 Load trees on mount
  useEffect(() => {
    const loadTrees = async () => {
      try {
        const data = await fetchTrees();
        setTrees(data);
      } catch (err) {
        console.error("Failed to load trees:", err);
      } finally {
        setLoadingTrees(false);
      }
    };
    loadTrees();
  }, []);

  // 🌳 Add tree handler
  const handleAddTree = async (e) => {
    e.preventDefault();
    if (!newTree.lat || !newTree.lng || !newTree.planter) return;
    setLoading(true);

    try {
      const saved = await addTree(newTree);
      setTrees((prev) => [...prev, saved]);
      setTokens((prev) => prev + 10);
      setNewTree({ lat: "", lng: "", planter: "" });
    } catch (err) {
      console.error("Error adding tree:", err);
      alert("Failed to save tree. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="text-center py-16 px-6 bg-green-700 text-white shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          🌳 Land Regen Dashboard
        </h1>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed">
          Monitor, visualize, and grow our collective restoration impact.
          Together, we’re reclaiming our planet — one root at a time.
        </p>
      </motion.section>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 text-center py-10 bg-green-100 border-t border-b border-green-300">
        <div className="flex flex-col items-center">
          <TreePine className="text-green-700 mb-2" size={32} />
          <p className="text-lg font-bold text-green-800">{trees.length}</p>
          <p className="text-gray-600">Trees Planted</p>
        </div>
        <div className="flex flex-col items-center">
          <Leaf className="text-green-700 mb-2" size={32} />
          <p className="text-lg font-bold text-green-800">{tokens}</p>
          <p className="text-gray-600">Green Tokens</p>
        </div>
        <div className="flex flex-col items-center">
          <Users className="text-green-700 mb-2" size={32} />
          <p className="text-lg font-bold text-green-800">Community</p>
          <p className="text-gray-600">Active Planters</p>
        </div>
      </div>

      {/* Map Section */}
      <section className="flex justify-center py-10">
        <div className="w-[90%] md:w-[80%] h-[400px] rounded-2xl overflow-hidden shadow-lg border border-green-300 bg-white">
          {loadingTrees ? (
            <div className="flex items-center justify-center h-full text-green-600 font-medium">
              Loading tree data...
            </div>
          ) : (
            <MapContainer
              center={[-1.286389, 36.817223]}
              zoom={6}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {trees.map((tree, index) => (
                <Marker
                  key={index}
                  position={[parseFloat(tree.lat), parseFloat(tree.lng)]}
                >
                  <Popup>
                    <strong>Tree planted by:</strong> {tree.planter}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </section>

      {/* Add Tree Form */}
      <section className="container mx-auto py-12 px-6 bg-white rounded-xl shadow-inner mb-8">
        <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
          🌱 Add Your Tree
        </h3>
        <form
          onSubmit={handleAddTree}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <input
            type="text"
            placeholder="Latitude"
            value={newTree.lat}
            onChange={(e) => setNewTree({ ...newTree, lat: e.target.value })}
            className="p-3 border rounded-lg shadow-sm"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={newTree.lng}
            onChange={(e) => setNewTree({ ...newTree, lng: e.target.value })}
            className="p-3 border rounded-lg shadow-sm"
          />
          <input
            type="text"
            placeholder="Your Name"
            value={newTree.planter}
            onChange={(e) => setNewTree({ ...newTree, planter: e.target.value })}
            className="p-3 border rounded-lg shadow-sm"
          />
          <Button
            type="submit"
            className="col-span-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Tree 🌿"}
          </Button>
        </form>

        <div className="text-center mt-6 text-green-700 font-medium">
          🎁 You’ve earned <strong>{tokens}</strong> Green Tokens for planting
          trees!
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-600 border-t">
        © 2025 Land Regen — Growing together for a sustainable future 🌱
      </footer>
    </div>
  );
}
