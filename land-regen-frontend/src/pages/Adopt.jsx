import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Adopt() {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const fetchTrees = async () => {
      const { data, error } = await supabase
        .from("trees")
        .select("*")
        .eq("adopted", false); // show only unadopted trees
      if (error) console.error("Error loading trees:", error);
      else setTrees(data);
    };
    fetchTrees();
  }, []);

  const handleAdopt = async (treeId) => {
    const { error } = await supabase
      .from("trees")
      .update({ adopted: true })
      .eq("id", treeId);

    if (!error) {
      alert("🎉 You’ve adopted this tree!");
      setTrees((prev) => prev.filter((tree) => tree.id !== treeId));
    } else {
      console.error("Error adopting tree:", error);
    }
  };

  return (
    <div className="adopt-page p-8">
      <h1 className="text-3xl font-bold mb-4">🌿 Adopt a Tree</h1>
      <p className="text-gray-600 mb-6">
        Choose a tree to adopt and contribute to SDG 15 — Life on Land.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trees.map((tree) => (
          <div
            key={tree.id}
            className="border rounded-2xl shadow p-4 flex flex-col items-start"
          >
            <h2 className="text-xl font-semibold">{tree.species}</h2>
            <p>Planted by: {tree.planter}</p>
            <p>
              Location: {tree.latitude.toFixed(3)}, {tree.longitude.toFixed(3)}
            </p>
            <button
              onClick={() => handleAdopt(tree.id)}
              className="mt-3 bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700"
            >
              Adopt this Tree
            </button>
          </div>
        ))}
      </div>

      {trees.length === 0 && (
        <p className="mt-8 text-gray-500">All trees have been adopted 🌳❤️</p>
      )}
    </div>
  );
}
