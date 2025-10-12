// src/pages/AddTree.jsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AddTree() {
  const [species, setSpecies] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [planterId, setPlanterId] = useState("");
  const [plotId, setPlotId] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!species || !latitude || !longitude || !planterId) {
      alert("Please fill all required fields.");
      return;
    }

    const { data, error } = await supabase.from("trees").insert([
      {
        species,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        planter: planterId, // foreign key to planters.id
        planted_by: "Land ReGen Demo Team",
        plot_id: plotId || null,
        status: "planted",
      },
    ]);

    if (error) {
      console.error("Error inserting tree:", error.message);
      setStatus("❌ Failed to add tree.");
    } else {
      console.log("Inserted:", data);
      setStatus("✅ Tree added successfully!");
      setSpecies("");
      setLatitude("");
      setLongitude("");
      setPlanterId("");
      setPlotId("");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-green-700">🌱 Add New Tree</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium">Species</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Moringa Oleifera"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-600 font-medium">Latitude</label>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="-1.2921"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Longitude</label>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="36.8219"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Planter ID</label>
          <input
            type="text"
            value={planterId}
            onChange={(e) => setPlanterId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="UUID of planter"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Plot ID (optional)</label>
          <input
            type="text"
            value={plotId}
            onChange={(e) => setPlotId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="UUID of plot"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
        >
          Add Tree
        </button>
      </form>

      {status && <p className="text-center text-sm text-gray-600">{status}</p>}
    </div>
  );
}
