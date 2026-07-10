import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export const readJsonFile = (filename: string, baseUrl: string): unknown => {
  const filePath = path.join(_dirname, "..", "..", "data", filename);
  try {
    let data = fs.readFileSync(filePath, "utf8");
    data = data.replace(/http:\/\/localhost:3000/g, baseUrl);
    return JSON.parse(data) as unknown;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};
