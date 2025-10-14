import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaTree, FaSeedling } from "react-icons/fa";
import { motion } from "framer-motion";

// Map marker icon setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Dashboard = () => {
  const [trees] = useState([
    { id: 1, species: "Acacia", plantedBy: "John", position: [-1.286389, 36.817223] },
    { id: 2, species: "Mugumo", plantedBy: "Mary", position: [-1.28333, 36.81667] },
    { id: 3, species: "Neem", plantedBy: "Ali", position: [-1.29, 36.82] },
  ]);

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 p-4">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
        🌳 Trees make a beautiful country. Plant yours!
      </h1>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8 mb-8">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="bg-green-700 text-white p-5 rounded-full shadow-lg">
            <FaTree size={30} />
          </div>
          <p className="mt-2 text-lg font-semibold">Plant a Tree</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="bg-green-500 text-white p-5 rounded-full shadow-lg">
            <FaSeedling size={30} />
          </div>
          <p className="mt-2 text-lg font-semibold">Adopt a Tree</p>
        </motion.div>
      </div>

      {/* Map Section */}
      <div className="w-full flex justify-center">
        <div className="w-[90%] h-[60vh] rounded-2xl overflow-hidden shadow-lg">
          <MapContainer
            center={[-1.286389, 36.817223]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {trees.map((tree) => (
              <Marker key={tree.id} position={tree.position}>
                <Popup>
                  <strong>{tree.species}</strong> <br />
                  Planted by: {tree.plantedBy}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
