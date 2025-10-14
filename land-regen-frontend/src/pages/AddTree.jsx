import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AddTree() {
  const [species, setSpecies] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [plantedBy, setPlantedBy] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("trees")
      .insert([{ species, latitude, longitude, planted_by: plantedBy, adopted: false }]);
    if (error) {
      setMessage("❌ Error planting tree: " + error.message);
    } else {
      setMessage("✅ Tree added successfully!");
      setSpecies("");
      setLatitude("");
      setLongitude("");
      setPlantedBy("");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">🌱 Plant a Tree</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Tree Species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="text"
          placeholder="Planted By"
          value={plantedBy}
          onChange={(e) => setPlantedBy(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Add Tree
        </button>
      </form>
      {message && <p className="text-center mt-4 text-green-600">{message}</p>}
    </div>
  );
}
