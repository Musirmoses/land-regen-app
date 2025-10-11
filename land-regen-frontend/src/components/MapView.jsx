import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon bug in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView({ trees = [] }) {
  const center = trees.length
    ? [trees[0].latitude, trees[0].longitude]
    : [-1.286389, 36.817223]; // Default Nairobi

  return (
    <MapContainer center={center} zoom={6} className="h-full w-full">
      <TileLayer
        attribution='© OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {trees.map((tree) => (
        <Marker
          key={tree.id}
          position={[tree.latitude, tree.longitude]}
          title={tree.species}
        >
          <Popup>
            <div>
              <h3 className="font-bold text-green-700">{tree.species}</h3>
              <p>
                <strong>Planted by:</strong> {tree.users?.name || "Unknown"}
              </p>
              <p>
                <strong>Plot:</strong> {tree.plots?.name || "Unassigned"}
              </p>
              <p>
                <strong>Coords:</strong>{" "}
                {tree.latitude.toFixed(4)}, {tree.longitude.toFixed(4)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(tree.planted_at).toLocaleDateString()}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
