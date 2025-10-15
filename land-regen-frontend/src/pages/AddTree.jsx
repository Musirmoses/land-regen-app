import React, { useState } from "react";
import { addTree } from "../lib/api";

export default function AddTree() {
  const [form, setForm] = useState({
    species: "",
    latitude: "",
    longitude: "",
    planted_by: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      const res = await addTree(form);
      setStatus("✅ Tree added successfully!");
      console.log(res);
    } catch (err) {
      console.error(err);
      setStatus("❌ Error saving tree.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Tree</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="species"
          placeholder="Species"
          value={form.species}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={form.latitude}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={form.longitude}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="planted_by"
          placeholder="Planted by"
          value={form.planted_by}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Tree
        </button>
      </form>
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
}
