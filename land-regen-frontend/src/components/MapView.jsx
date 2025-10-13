import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const treeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/427/427735.png",
  iconSize: [30, 30],
});

export default function MapView({ trees }) {
  return (
    <MapContainer
      center={[-1.2921, 36.8219]}
      zoom={7}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {trees?.map((tree) => (
        <Marker
          key={tree.id}
          position={[tree.latitude, tree.longitude]}
          icon={treeIcon}
        >
          <Popup>
            <strong>{tree.species}</strong><br />
            Planted by: {tree.planted_by}<br />
            Status: {tree.adopted ? "Adopted 🌿" : "Available 🌱"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
