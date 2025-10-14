import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Adopt() {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    fetchTrees();
  }, []);

  async function fetchTrees() {
    const { data, error } = await supabase.from("trees").select("*").eq("adopted", false);
    if (!error) setTrees(data);
  }

  async function adoptTree(id) {
    const { error } = await supabase.from("trees").update({ adopted: true }).eq("id", id);
    if (!error) fetchTrees();
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">🌾 Adopt a Tree</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {trees.map((tree) => (
          <div key={tree.id} className="p-4 border rounded-lg shadow">
            <h3 className="font-semibold text-lg">{tree.species}</h3>
            <p>Location: {tree.latitude}, {tree.longitude}</p>
            <p>Planted by: {tree.planted_by}</p>
            <button
              onClick={() => adoptTree(tree.id)}
              className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Adopt 🌿
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
