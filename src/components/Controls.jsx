import { useEffect, useState, useCallback } from "react";

export default function Controls({
  userCoords,
  setUserCoords,
  setRouteGeoJson,
  setRouteInfo,
  locations,
}) {
  const [source, setSource] = useState("myLocation");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  // 📍 Get GPS location
  const refreshLocation = useCallback(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      setUserCoords([pos.coords.longitude, pos.coords.latitude]);
    });
  }, [setUserCoords]);

  useEffect(() => {
    refreshLocation();
  }, [refreshLocation]);

  // 🔊 Text To Speech
  function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  // 🧠 NLP destination extraction
  function extractDestinationFromSpeech(text) {
    const lowerText = text.toLowerCase();
    const placeNames = Object.keys(locations);

    for (let place of placeNames) {
      if (lowerText.includes(place.toLowerCase())) {
        return place;
      }
    }
    return null;
  }

  // 🎙 Voice Recognition
  function startVoiceRecognition() {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const matchedPlace = extractDestinationFromSpeech(transcript);

      if (matchedPlace) {
        setDestination(matchedPlace);
        setTimeout(() => getRoute(source, matchedPlace), 500);
      } else {
        alert("Destination not recognized");
      }

      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Voice recognition error");
    };
  }

  // 🛣 Route generation
  async function getRoute(
    selectedSource = source,
    selectedDestination = destination,
  ) {
    if (!selectedDestination) {
      alert("Select destination");
      return;
    }

    let fromCoords;

    if (selectedSource === "myLocation") {
      if (!userCoords) {
        alert("User location not available");
        return;
      }
      fromCoords = userCoords;
    } else {
      const src = locations[selectedSource];
      fromCoords = [src[1], src[0]];
    }

    const dest = locations[selectedDestination];
    const toCoords = [dest[1], dest[0]];

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromCoords,
          toCoords,
        }),
      });

      const data = await res.json();

      setRouteGeoJson(data);

      const feature = data.features[0];
      const props = feature.properties;

      let distance = null;
      let duration = null;
      let steps = [];

      if (props.summary) {
        distance = props.summary.distance;
        duration = props.summary.duration;
      }

      if (props.segments && props.segments.length > 0) {
        const segment = props.segments[0];
        steps = segment.steps || [];

        if (!distance) distance = segment.distance;
        if (!duration) duration = segment.duration;
      }

      if (distance && duration) {
        const distanceKm = (distance / 1000).toFixed(2);
        const durationMin = (duration / 60).toFixed(1);

        setRouteInfo({
          distance: distanceKm,
          duration: durationMin,
          steps: steps,
        });

        // 🔊 Speak route summary
        speakText(
          `Route is ${distanceKm} kilometers and will take approximately ${durationMin} minutes.`,
        );

        // 🔊 Speak turn-by-turn instructions
        steps.forEach((step, index) => {
          setTimeout(
            () => {
              speakText(step.instruction);
            },
            (index + 1) * 4000,
          );
        });
      }
    } catch (error) {
      alert("Route error");
      console.error(error);
    }

    setLoading(false);
  }

  function clearRoute() {
    setRouteGeoJson(null);
    setRouteInfo(null);
    window.speechSynthesis.cancel(); // stop speaking
  }

  return (
    <div className="controls">
      {/* SOURCE */}
      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="myLocation">Use My Current Location</option>
        {Object.keys(locations).map((place) => (
          <option key={place}>{place}</option>
        ))}
      </select>

      {/* DESTINATION */}
      <select
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      >
        <option value="">Select destination</option>
        {Object.keys(locations).map((place) => (
          <option key={place}>{place}</option>
        ))}
      </select>

      <button onClick={() => getRoute()} disabled={loading}>
        {loading ? "Loading..." : "Get Route"}
      </button>

      <button onClick={startVoiceRecognition}>
        {listening ? "Listening..." : "🎙 Voice Command"}
      </button>

      <button onClick={clearRoute}>Clear Route</button>

      <button onClick={refreshLocation}>Refresh Location</button>
    </div>
  );
}
