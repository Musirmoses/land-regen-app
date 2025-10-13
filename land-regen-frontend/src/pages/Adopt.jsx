import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Adopt() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adopting, setAdopting] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAvailableTrees();
  }, []);

  const fetchAvailableTrees = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch trees that are not adopted
      const { data, error } = await supabase
        .from("trees")
        .select("id, species, latitude, longitude, planted_by, adopted")
        .eq("adopted", false);

      if (error) throw error;
      setTrees(data || []);
    } catch (err) {
      console.error("Error fetching trees:", err.message);
      setError("Failed to load trees.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = async (treeId) => {
    try {
      setAdopting(treeId);
      const { error } = await supabase
        .from("trees")
        .update({ adopted: true })
        .eq("id", treeId);

      if (error) throw error;
      alert("🎉 Tree adopted successfully!");
      fetchAvailableTrees();
    } catch (err) {
      console.error("Error adopting tree:", err.message);
      alert("Failed to adopt this tree. Try again.");
    } finally {
      setAdopting(null);
    }
  };

  if (loading) return <div className="p-6 text-center">🌱 Loading trees...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        🌿 Adopt a Tree
      </h1>

      {trees.length === 0 ? (
        <p className="text-center text-gray-700">All trees have been adopted! 🎉</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {trees.map((tree) => (
            <div
              key={tree.id}
              className="bg-white shadow-lg rounded-xl p-4 border border-green-100 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-2">
                {tree.species}
              </h2>
              <p className="text-sm text-gray-600">
                🌍 Location: {tree.latitude.toFixed(4)}, {tree.longitude.toFixed(4)}
              </p>
              <p className="text-sm text-gray-600">
                👩‍🌾 Planted by: {tree.planted_by || "Unknown"}
              </p>
              <button
                disabled={adopting === tree.id}
                onClick={() => handleAdopt(tree.id)}
                className={`mt-4 w-full py-2 px-3 rounded-md text-white font-medium ${
                  adopting === tree.id
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {adopting === tree.id ? "Adopting..." : "Adopt Tree"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
