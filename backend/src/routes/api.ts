import { Router, type Request, type Response } from "express";
import { readJsonFile } from "../utils/fileHandler.js";

const router = Router();

const getBaseUrl = (req: Request) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  return `${protocol}://${req.get('host')}`;
};


router.get("/listing", (req: Request, res: Response) => {
  const data = readJsonFile("listing.json", getBaseUrl(req));
  if (data) res.json(data);
  else res.status(500).json({ error: "Data not found" });
});

router.get("/gallery", (req: Request, res: Response) => {
  const data = readJsonFile("gallery.json", getBaseUrl(req));
  if (data) res.json(data);
  else res.status(500).json({ error: "Data not found" });
});

router.get("/reviews", (req: Request, res: Response) => {
  const data = readJsonFile("reviews.json", getBaseUrl(req));
  if (data) res.json(data);
  else res.status(500).json({ error: "Data not found" });
});

router.get("/amenities", (req: Request, res: Response) => {
  const data = readJsonFile("amenities.json", getBaseUrl(req));
  if (data) res.json(data);
  else res.status(500).json({ error: "Data not found" });
});

router.get("/host", (req: Request, res: Response) => {
  const data = readJsonFile("host.json", getBaseUrl(req));
  if (data) res.json(data);
  else res.status(500).json({ error: "Data not found" });
});

export default router;
