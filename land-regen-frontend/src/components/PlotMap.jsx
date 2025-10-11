import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const plotIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [28, 28],
});

export default function PlotMap({ plots }) {
  if (!plots || plots.length === 0) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center border border-gray-200 rounded-xl bg-gray-50">
        <p className="text-gray-500">No plots available yet</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[70vh] rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={[-1.2921, 36.8219]} // default Nairobi
        zoom={7}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {plots.map((plot) => {
          // If your backend returns a GeoJSON, parse coordinates
          let polygonCoords = null;
          if (plot.geom && typeof plot.geom === "object") {
            polygonCoords = plot.geom.coordinates?.[0]?.map(([lng, lat]) => [lat, lng]);
          }

          // If you store lat/lng separately
          const hasLatLng = plot.latitude && plot.longitude;

          return (
            <div key={plot.id}>
              {polygonCoords ? (
                <Polygon positions={polygonCoords} color="green">
                  <Popup>
                    <strong>{plot.name}</strong>
                    <br />
                    {plot.soil_type} · {plot.area_ha} ha
                  </Popup>
                </Polygon>
              ) : hasLatLng ? (
                <Marker position={[plot.latitude, plot.longitude]} icon={plotIcon}>
                  <Popup>
                    <strong>{plot.name}</strong>
                    <br />
                    Soil: {plot.soil_type}
                    <br />
                    Area: {plot.area_ha} ha
                  </Popup>
                </Marker>
              ) : null}
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}
