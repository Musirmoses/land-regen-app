import { useState } from "react";
import axios from "axios";

export default function AddTree() {
  const [form, setForm] = useState({ owner: "", plot_id: "", species: "", height_m: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_API_URL}/trees/`, form);
    alert("Tree added successfully!");
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add a New Tree</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {["owner", "plot_id", "species", "height_m"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            className="border p-2 rounded"
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Add Tree
        </button>
      </form>
    </div>
  );
}
