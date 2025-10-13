// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import MapView from "../components/MapView";

export default function Dashboard() {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {
    const { data, error } = await supabase
      .from("trees")
      .select("id, species, latitude, longitude, planted_by, planter, plot_id, status");

    if (error) {
      console.error("Error fetching trees:", error.message);
    } else {
      setTrees(data);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-green-700">🌿 Tree Tracking Dashboard</h1>
      <p className="text-gray-600 mb-4">
        View planted trees, locations, and planter details.
      </p>

      <MapView trees={trees} />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {trees.map((tree) => (
          <div key={tree.id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-bold text-green-700">{tree.species}</h2>
            <p>Latitude: {tree.latitude}</p>
            <p>Longitude: {tree.longitude}</p>
            <p>Planted by: {tree.planted_by}</p>
            <p>Status: {tree.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
