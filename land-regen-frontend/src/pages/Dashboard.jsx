import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Leaf, TreePine, Users } from "lucide-react";
import { Button } from "@/components/button";

export default function Dashboard() {
  const [trees, setTrees] = useState([]);
  const [newTree, setNewTree] = useState({ lat: "", lng: "", planter: "" });
  const [tokens, setTokens] = useState(0);

  const handleAddTree = (e) => {
    e.preventDefault();
    if (newTree.lat && newTree.lng && newTree.planter) {
      setTrees([...trees, newTree]);
      setTokens(tokens + 10); // Reward for each tree planted
      setNewTree({ lat: "", lng: "", planter: "" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-green-700 text-white shadow-md">
        <h1 className="text-2xl font-bold">🌿 Greener Earth</h1>
        <div className="flex gap-6">
          <a href="#" className="hover:text-green-200">Home</a>
          <a href="#" className="hover:text-green-200">Plant a Tree</a>
          <a href="#" className="hover:text-green-200">Adopt</a>
          <a href="#" className="hover:text-green-200">Dashboard</a>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center text-center py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">
          Trees Make a Beautiful Country 🌳
        </h2>
        <p className="text-lg mt-2 text-gray-700 max-w-xl">
          Join the movement to turn deforested lands into lush green havens across our planet.
        </p>

        {/* Forestation Story */}
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-8">
          <motion.img
            src="https://images.unsplash.com/photo-1581092795360-fd1ca04f7f29?auto=format&fit=crop&w=700&q=60"
            alt="Deforested area"
            className="w-72 h-48 object-cover rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
          <motion.img
            src="https://images.unsplash.com/photo-1599351432207-7e4d52e4e6b2?auto=format&fit=crop&w=700&q=60"
            alt="People planting trees"
            className="w-72 h-48 object-cover rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
          <motion.img
            src="https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=700&q=60"
            alt="Reforested area"
            className="w-72 h-48 object-cover rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </motion.section>

      {/* Icon Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center py-10 bg-green-200 rounded-t-3xl">
        <div className="flex flex-col items-center">
          <TreePine size={48} className="text-green-800" />
          <h3 className="font-semibold mt-2">Plant a Tree</h3>
        </div>
        <div className="flex flex-col items-center">
          <Leaf size={48} className="text-green-700" />
          <h3 className="font-semibold mt-2">Adopt a Tree</h3>
        </div>
        <div className="flex flex-col items-center">
          <Users size={48} className="text-green-600" />
          <h3 className="font-semibold mt-2">Join the Community</h3>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex justify-center py-8">
        <div className="w-[90%] md:w-[80%] h-[350px] rounded-2xl overflow-hidden shadow-lg border border-green-300">
          <MapContainer center={[-1.286389, 36.817223]} zoom={6} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {trees.map((tree, index) => (
              <Marker key={index} position={[parseFloat(tree.lat), parseFloat(tree.lng)]}>
                <Popup>
                  <strong>Tree planted by:</strong> {tree.planter}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Add Tree Form */}
      <section className="px-6 md:px-12 py-10 bg-green-50 rounded-xl shadow-inner mb-8">
        <h3 className="text-xl font-bold text-green-700 mb-4">🌱 Add Your Tree</h3>
        <form
          onSubmit={handleAddTree}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            placeholder="Latitude"
            value={newTree.lat}
            onChange={(e) => setNewTree({ ...newTree, lat: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={newTree.lng}
            onChange={(e) => setNewTree({ ...newTree, lng: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Your Name"
            value={newTree.planter}
            onChange={(e) => setNewTree({ ...newTree, planter: e.target.value })}
            className="p-2 border rounded"
          />
          <Button type="submit" className="col-span-full bg-green-600 hover:bg-green-700">
            Add Tree
          </Button>
        </form>

        <div className="text-center mt-4 text-green-700 font-medium">
          🎁 You’ve earned <strong>{tokens}</strong> Green Tokens for planting trees!
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-8 px-6 text-center">
        <h4 className="text-xl font-bold mb-2">SDG 15 – Life on Land 🌍</h4>
        <p className="max-w-2xl mx-auto text-sm">
          Protecting, restoring, and promoting sustainable use of terrestrial ecosystems
          is essential for human survival. Every tree planted contributes to biodiversity,
          combats desertification, and secures a greener, more resilient future.
        </p>
        <p className="mt-4 text-sm text-green-200">
          Together, we grow stronger. Together, we grow greener. 🌿
        </p>
      </footer>
    </div>
  );
}
