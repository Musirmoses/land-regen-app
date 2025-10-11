import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AddTree() {
  const [formData, setFormData] = useState({
    species: "",
    latitude: "",
    longitude: "",
    planted_by: "",
    planter: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    const { species, latitude, longitude, planted_by, planter } = formData;

    const { data, error } = await supabase.from("trees").insert([
      {
        species,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        planted_by,
        planter,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      setStatus(`Error: ${error.message}`);
    } else {
      setStatus("✅ Tree added successfully!");
      setFormData({
        species: "",
        latitude: "",
        longitude: "",
        planted_by: "",
        planter: "",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-green-700 mb-4">🌳 Add a New Tree</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Species</label>
          <input
            type="text"
            name="species"
            value={formData.species}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
            placeholder="e.g. Moringa Oleifera"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
              placeholder="-1.28333"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
              placeholder="36.81667"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Planted By</label>
          <input
            type="text"
            name="planted_by"
            value={formData.planted_by}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
            placeholder="Land ReGen Team"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Planter</label>
          <input
            type="text"
            name="planter"
            value={formData.planter}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
            placeholder="Demo User"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add Tree
        </button>
      </form>

      {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
    </div>
  );
}
