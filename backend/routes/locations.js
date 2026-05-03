import express from "express";
import { campusLocations } from "../data/campusLocations.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(campusLocations);
});

export default router;