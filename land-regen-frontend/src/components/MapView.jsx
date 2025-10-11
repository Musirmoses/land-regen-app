import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import L from "leaflet";

// Simple green marker icon
const treeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/427/427735.png",
  iconSize: [32, 32],
});

export default function MapView() {
  const [trees, setTrees] = useState([]);
  const [newLocation, setNewLocation] = useState(null);

  // Fetch trees from Supabase
  const fetchTrees = async () => {
    const { data, error } = await supabase.from("trees").select("*");
    if (!error) setTrees(data);
  };

  useEffect(() => {
    fetchTrees();
  }, []);

  // Capture click location
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setNewLocation(e.latlng);
      },
    });
    return null;
  };

  // Add new tree to Supabase
  const addTree = async () => {
    if (!newLocation) return;
    const { data, error } = await supabase
      .from("trees")
      .insert([{ latitude: newLocation.lat, longitude: newLocation.lng }]);
    if (!error) {
      alert("🌳 New tree added!");
      fetchTrees();
      setNewLocation(null);
    }
  };

  return (
    <div className="w-full h-[80vh] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={[-1.2921, 36.8219]} // Nairobi default
        zoom={8}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        <MapClickHandler />
        {trees.map((tree) => (
          <Marker
            key={tree.id}
            position={[tree.latitude, tree.longitude]}
            icon={treeIcon}
          >
            <Popup>
              🌱 Tree #{tree.id} <br /> Lat: {tree.latitude.toFixed(3)}, Lng:{" "}
              {tree.longitude.toFixed(3)}
            </Popup>
          </Marker>
        ))}
        {newLocation && (
          <Marker position={[newLocation.lat, newLocation.lng]} icon={treeIcon}>
            <Popup>
              <button
                onClick={addTree}
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                Add Tree Here
              </button>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
