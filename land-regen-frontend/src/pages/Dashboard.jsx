import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Dashboard() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrees = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("trees").select("*");

      if (error) {
        console.error("Error fetching trees:", error);
      } else {
        setTrees(data);
      }
      setLoading(false);
    };

    fetchTrees();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-green-700">
        🌿 Tree Tracking Dashboard
      </h1>
      <p className="text-gray-600">
        View all planted trees, their coordinates, and who planted them.
      </p>

      {/* Map Section */}
      <div className="h-[500px] rounded-xl overflow-hidden shadow-md">
        <MapContainer
          center={[-1.286389, 36.817223]} // Nairobi default center
          zoom={8}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap contributors'
          />

          {trees.map((tree) => (
            <Marker
              key={tree.id}
              position={[tree.latitude, tree.longitude]}
              title={tree.species}
            >
              <Popup>
                <strong>{tree.species}</strong> <br />
                🌱 Planted by: {tree.planted_by} <br />
                👩🏽‍🌾 Planter: {tree.planter} <br />
                📍 Lat: {tree.latitude.toFixed(5)}, Lon: {tree.longitude.toFixed(5)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Tree List Section */}
      <div>
        <h2 className="text-lg font-semibold mt-6 mb-3">All Trees</h2>
        {loading ? (
          <p>Loading trees...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {trees.map((tree) => (
              <div
                key={tree.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-bold text-green-700">{tree.species}</h3>
                <p>Planted by: {tree.planted_by}</p>
                <p>Planter: {tree.planter}</p>
                <p>
                  Location: {tree.latitude.toFixed(4)}, {tree.longitude.toFixed(4)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


