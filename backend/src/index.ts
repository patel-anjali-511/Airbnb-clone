import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static assets from the images directory
// __dirname = server/src  →  ".." = server/  →  + folder name
const assetsDir = path.join(
  __dirname,
  "..",
  "Romantic Jacuzzi 1BHK Candolim _ Mirashya UG10 - Serviced apartments for Rent in Candolim, Goa, India - Airbnb"
);
app.use("/assets", express.static(assetsDir));

// Register API Routes
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Assets served at http://localhost:${PORT}/assets/`);
});

export default app;
