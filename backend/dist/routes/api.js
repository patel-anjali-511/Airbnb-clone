import { Router } from "express";
import { readJsonFile } from "../utils/fileHandler.js";
const router = Router();
router.get("/listing", (req, res) => {
    const data = readJsonFile("listing.json");
    if (data)
        res.json(data);
    else
        res.status(500).json({ error: "Data not found" });
});
router.get("/gallery", (req, res) => {
    const data = readJsonFile("gallery.json");
    if (data)
        res.json(data);
    else
        res.status(500).json({ error: "Data not found" });
});
router.get("/reviews", (req, res) => {
    const data = readJsonFile("reviews.json");
    if (data)
        res.json(data);
    else
        res.status(500).json({ error: "Data not found" });
});
router.get("/amenities", (req, res) => {
    const data = readJsonFile("amenities.json");
    if (data)
        res.json(data);
    else
        res.status(500).json({ error: "Data not found" });
});
router.get("/host", (req, res) => {
    const data = readJsonFile("host.json");
    if (data)
        res.json(data);
    else
        res.status(500).json({ error: "Data not found" });
});
export default router;
