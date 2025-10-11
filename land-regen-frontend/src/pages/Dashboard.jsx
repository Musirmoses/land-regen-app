import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import MapView from "../components/MapView";

export default function Dashboard() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrees = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("trees")
        .select(`
          id,
          species,
          latitude,
          longitude,
          planted_by,
          planted_at,
          users:planter_id (name, email),
          plots:plot_id (name, region)
        `);

      if (error) {
        console.error("Error fetching trees:", error.message);
      } else {
        setTrees(data);
      }
      setLoading(false);
    };

    fetchTrees();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <h2 className="text-lg text-gray-600 animate-pulse">
          🌱 Loading your trees...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-green-700">🌿 Tree Mapping Dashboard</h1>
      <p className="text-gray-600 mb-4">
        View planted trees, their planters, and plots across regions.
      </p>

      {/* Map section */}
      <div className="border rounded-2xl overflow-hidden shadow-lg h-[500px]">
        <MapView trees={trees} />
      </div>

      {/* Tree Cards section */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {trees.map((tree) => (
          <div
            key={tree.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-green-700">{tree.species}</h2>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Planted by:</strong>{" "}
              {tree.users?.name || "Unknown"} ({tree.users?.email || "No email"})
            </p>
            <p className="text-sm text-gray-500">
              <strong>Plot:</strong> {tree.plots?.name || "Unassigned"} –{" "}
              {tree.plots?.region || "Unknown region"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Coordinates:</strong>{" "}
              {tree.latitude?.toFixed(4)}, {tree.longitude?.toFixed(4)}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              🌱 Planted on {new Date(tree.planted_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
