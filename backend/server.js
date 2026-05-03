import express from "express";
import cors from "cors";

import locationRoutes from "./routes/locations.js";
import routeRoutes from "./routes/route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/locations", locationRoutes);
app.use("/api/route", routeRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});