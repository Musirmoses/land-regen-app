import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({ trees }) {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow">
      <MapContainer center={[-1.286389, 36.817223]} zoom={7} className="h-full w-full">
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trees.map((tree) => (
          <Marker key={tree.id} position={[tree.latitude, tree.longitude]}>
            <Popup>
              <b>{tree.species}</b><br />
              Planter: {tree.planter}<br />
              Planted By: {tree.planted_by}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

