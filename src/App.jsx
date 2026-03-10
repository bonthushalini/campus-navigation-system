import { useEffect, useState } from "react";
import CampusMap from "./components/CampusMap";
import Controls from "./components/Controls";

export default function App() {
  const [userCoords, setUserCoords] = useState(null);
  const [routeGeoJson, setRouteGeoJson] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [locations, setLocations] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch(() => alert("Failed to load locations"));
  }, []);

  return (
    <div className="app-container">
      <h2>📍 Shri Vishnu Educational Society – Campus Navigation</h2>

      <Controls
        userCoords={userCoords}
        setUserCoords={setUserCoords}
        setRouteGeoJson={setRouteGeoJson}
        setRouteInfo={setRouteInfo}
        locations={locations}
      />

      <div className="map-wrapper">
        <CampusMap
          userCoords={userCoords}
          routeGeoJson={routeGeoJson}
          locations={locations}
        />

        {/* 🔥 Floating Route Panel */}
        {routeInfo && (
          <div className="route-panel">
            <h4>🛣 Route Details</h4>
            <p>
              <strong>Distance:</strong> {routeInfo.distance} km
            </p>
            <p>
              <strong>Time:</strong> {routeInfo.duration} mins
            </p>

            {routeInfo.steps && routeInfo.steps.length > 0 && (
              <>
                <h4>🧭 Directions</h4>
                <ol>
                  {routeInfo.steps.map((step, index) => (
                    <li key={index}>{step.instruction}</li>
                  ))}
                </ol>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
