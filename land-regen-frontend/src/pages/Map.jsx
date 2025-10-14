import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/trees`)
      .then((res) => res.json())
      .then((data) => {
        setTrees(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trees:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading map...</p>;

  return (
    <div style={{ height: "600px", width: "100%", borderRadius: "12px", overflow: "hidden" }}>
      <MapContainer center={[-1.286389, 36.817223]} zoom={7} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        {trees.map((tree) => (
          <Marker key={tree.id} position={[tree.latitude, tree.longitude]}>
            <Popup>
              <strong>{tree.species}</strong><br />
              Planted by: {tree.planted_by}<br />
              {tree.adopted ? "🌿 Adopted" : "🪴 Available"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
