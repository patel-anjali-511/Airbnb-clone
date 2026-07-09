import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readJsonFile = (filename: string): unknown => {
  const filePath = path.join(__dirname, "..", "..", "data", filename);
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data) as unknown;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};
