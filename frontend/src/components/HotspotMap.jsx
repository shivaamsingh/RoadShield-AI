import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const hotspots = [
  { city: "Delhi", lat: 28.6139, lng: 77.2090, risk: "High" },
  { city: "Mumbai", lat: 19.0760, lng: 72.8777, risk: "Medium" },
  { city: "Bangalore", lat: 12.9716, lng: 77.5946, risk: "High" },
  { city: "Chennai", lat: 13.0827, lng: 80.2707, risk: "Low" },
];

export default function HotspotMap() {
  return (
    <MapContainer
      center={[22.5937, 78.9629]}
      zoom={5}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "16px",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hotspots.map((spot, index) => (
        <CircleMarker
          key={index}
          center={[spot.lat, spot.lng]}
          radius={10}
          color={
            spot.risk === "High"
              ? "red"
              : spot.risk === "Medium"
              ? "orange"
              : "green"
          }
        >
          <Popup>
            <strong>{spot.city}</strong>
            <br />
            Risk Level: {spot.risk}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}