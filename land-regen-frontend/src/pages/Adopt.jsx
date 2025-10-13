import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Adopt() {
  const [trees, setTrees] = useState([]);

  const fetchTrees = async () => {
    const { data, error } = await supabase
      .from("trees")
      .select("*")
      .eq("adopted", false);
    if (error) console.error(error);
    else setTrees(data);
  };

  const handleAdopt = async (id) => {
    const { error } = await supabase
      .from("trees")
      .update({ adopted: true })
      .eq("id", id);
    if (error) console.error(error);
    else fetchTrees();
  };

  useEffect(() => {
    fetchTrees();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">🌿 Adopt a Tree</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {trees.map((tree) => (
          <div key={tree.id} className="p-4 border rounded-xl bg-green-50">
            <h3 className="font-bold text-green-700">{tree.species}</h3>
            <p className="text-sm text-gray-600">
              Location: {tree.latitude}, {tree.longitude}
            </p>
            <p className="text-sm mb-2 text-gray-600">
              Planted by: {tree.planted_by}
            </p>
            <button
              onClick={() => handleAdopt(tree.id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-green-700"
            >
              Adopt 🌱
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
