import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import MapView from "../components/MapView";

export default function Dashboard() {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const fetchTrees = async () => {
      const { data, error } = await supabase.from("trees").select("*");
      if (!error) setTrees(data);
    };
    fetchTrees();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-green-700">🌿 Tree Mapping Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Explore planted trees and view planting activity in real time.
      </p>
      <MapView trees={trees} />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {trees.map((tree) => (
          <div key={tree.id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-bold">{tree.species}</h2>
            <p>Latitude: {tree.latitude}</p>
            <p>Longitude: {tree.longitude}</p>
            <p>Planted By: {tree.planted_by}</p>
            <p>Planter: {tree.planter}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

