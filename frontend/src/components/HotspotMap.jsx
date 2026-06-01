import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function HotspotMap() {
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    axios
      .get("https://roadshield-ai.onrender.com/hotspots")
      .then((res) => setHotspots(res.data))
      .catch((err) => console.error(err));
  }, []);

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