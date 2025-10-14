import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { supabase } from "../lib/supabaseClient";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Dashboard() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all trees from Supabase
  useEffect(() => {
    const fetchTrees = async () => {
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

  if (loading) {
    return <p className="text-center mt-8 text-gray-500">Loading map...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
        🌍 Tree Dashboard
      </h2>
      <p className="text-center text-gray-600 mb-6">
        View planted and adopted trees on the map below.
      </p>

      <div
        className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg border"
        style={{ height: "600px" }}
      >
        <MapContainer
          center={[-1.286389, 36.817223]} // Nairobi default center
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {trees.length > 0 ? (
            trees.map((tree) => (
              <Marker
                key={tree.id}
                position={[tree.latitude, tree.longitude]}
              >
                <Popup>
                  <strong>🌱 {tree.species}</strong>
                  <br />
                  <b>Planted by:</b> {tree.planted_by || "Unknown"}
                  <br />
                  <b>Status:</b>{" "}
                  {tree.adopted ? (
                    <span className="text-green-700">Adopted 🌿</span>
                  ) : (
                    <span className="text-yellow-600">Available 🪴</span>
                  )}
                  <br />
                  <small>
                    Lat: {tree.latitude}, Lng: {tree.longitude}
                  </small>
                </Popup>
              </Marker>
            ))
          ) : (
            <p className="text-center text-gray-500">No trees found.</p>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
