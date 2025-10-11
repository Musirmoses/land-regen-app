import { useEffect, useState } from "react";
import axios from "axios";
import PlotMap from "../components/PlotMap";

export default function Dashboard() {
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    // Fetch plots from FastAPI backend
    axios
      .get(`${import.meta.env.VITE_API_URL}/plots/`)
      .then((res) => setPlots(res.data))
      .catch((err) => console.error("Error fetching plots:", err));
  }, []);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">
          🌿 Tree Mapping Dashboard
        </h1>
        <p className="text-gray-600">
          Explore all planted trees, add new ones, and track regeneration activity in real time.
        </p>
      </div>

      {/* Interactive Map */}
      <PlotMap plots={plots} />

      {/* Plot Summary Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Plots</h2>
        {plots.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {plots.map((plot) => (
              <div
                key={plot.id}
                className="bg-white rounded-xl p-4 shadow hover:shadow-md border border-gray-100 transition"
              >
                <h3 className="text-lg font-bold text-green-700">{plot.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Soil: {plot.soil_type || "N/A"}</p>
                <p className="text-sm text-gray-600">Area: {plot.area_ha || "0"} ha</p>
                <p className="text-sm text-gray-600">
                  Coordinates:{" "}
                  {plot.latitude && plot.longitude
                    ? `${plot.latitude.toFixed(3)}, ${plot.longitude.toFixed(3)}`
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic mt-4">
            No plots yet. Add one through your dashboard or API.
          </p>
        )}
      </div>
    </div>
  );
}

