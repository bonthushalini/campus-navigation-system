import express from "express";

const router = express.Router();

const ORS_API_KEY = "5b3ce3597851110001cf62483399cd11b5c04f27a103dfa0c7dab009";

router.post("/", async (req, res) => {
  try {
    const { fromCoords, toCoords } = req.body;

    if (!fromCoords || !toCoords) {
      return res.status(400).json({ error: "Coordinates missing" });
    }

    const response = await fetch(
      "https://api.openrouteservice.org/v2/directions/foot-walking/geojson",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ORS_API_KEY,
        },
        body: JSON.stringify({
          coordinates: [fromCoords, toCoords],
          instructions: true,
        }),
      },
    );

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      console.log("ORS returned no route", data);
      return res.status(400).json({ error: "No route found" });
    }

    res.json(data);
  } catch (error) {
    console.error("ORS ERROR:", error);
    res.status(500).json({ error: "Route generation failed" });
  }
});

export default router;
