import fs from  "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

// Helper to get current file path (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JOBS_FILE = path.join(__dirname, "../jobs.json");

// Utility function to read JSON 
function readJobsFile() {
  if (!fs.existsSync(JOBS_FILE)) {
    fs.writeFileSync(JOBS_FILE, JSON.stringify({ jobs: [], dlq: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(JOBS_FILE));
}

// Utility function to write JSON 
function writeJobsFile(data) {
  fs.writeFileSync(JOBS_FILE, JSON.stringify(data, null, 2));
}