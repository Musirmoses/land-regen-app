import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import MapView from "../components/MapView";

export default function Dashboard() {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const fetchTrees = async () => {
      const { data, error } = await supabase.from("trees").select("*");
      if (error) console.error(error);
      else setTrees(data);
    };
    fetchTrees();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        🌳 Land Regen Dashboard
      </h1>
      <MapView trees={trees} />
    </div>
  );
}