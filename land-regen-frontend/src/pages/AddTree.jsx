import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AddTree() {
  const [formData, setFormData] = useState({
    species: "",
    latitude: "",
    longitude: "",
    planted_by: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("trees").insert([formData]);
    if (error) console.error(error);
    else alert("🌿 Tree successfully added!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4">🌱 Plant a Tree</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {["species", "latitude", "longitude", "planted_by"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={formData[field]}
            onChange={(e) =>
              setFormData({ ...formData, [field]: e.target.value })
            }
            required
            className="border p-3 rounded-lg"
          />
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Add Tree
        </button>
      </form>
    </div>
  );
}
