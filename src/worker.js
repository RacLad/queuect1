import fs from "fs";
import path from "path";
import { exec } from "child_process";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { setTimeout as delay } from "timers/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JOBS_FILE = path.join(__dirname, "../jobs.json");

function readJobsFile() {
  if (!fs.existsSync(JOBS_FILE)) {
    fs.writeFileSync(JOBS_FILE, JSON.stringify({ jobs: [], dlq: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(JOBS_FILE));
}

function writeJobsFile(data) {
  fs.writeFileSync(JOBS_FILE, JSON.stringify(data, null, 2));
}

// 🧮 Exponential Backoff Calculation
function getBackoffDelay(base, attempts) {
  return base ** attempts * 1000; // in milliseconds
}