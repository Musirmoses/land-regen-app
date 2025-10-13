import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AddTree() {
  const [species, setSpecies] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [planter, setPlanter] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("trees").insert([
      {
        species,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        planted_by: "Land ReGen Team",
        planter,
      },
    ]);
    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      setMessage("✅ Tree successfully added!");
      setSpecies("");
      setLatitude("");
      setLongitude("");
      setPlanter("");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-700 mb-6">🌱 Add a New Tree</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="w-full p-3 border rounded-xl"
          placeholder="Tree Species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border rounded-xl"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border rounded-xl"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border rounded-xl"
          placeholder="Planter Name"
          value={planter}
          onChange={(e) => setPlanter(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-green-700">{message}</p>}
    </div>
  );
}


