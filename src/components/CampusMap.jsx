import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

export default function CampusMap({ userCoords, routeGeoJson, locations }) {
  return (
    <MapContainer
      center={userCoords ? [userCoords[1], userCoords[0]] : [16.5683, 81.5234]}
      zoom={18}
      style={{ height: "75vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Campus markers */}
      {Object.entries(locations).map(([name, [lat, lon]]) => (
        <Marker key={name} position={[lat, lon]}>
          <Popup>{name}</Popup>
        </Marker>
      ))}

      {/* User marker */}
      {userCoords && (
        <Marker position={[userCoords[1], userCoords[0]]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* Route line (SAFE) */}
      {routeGeoJson?.features && (
        <GeoJSON data={routeGeoJson} style={{ color: "red", weight: 5 }} />
      )}
    </MapContainer>
  );
}
