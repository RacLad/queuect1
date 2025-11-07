import fs from "fs";
import path from "path";
import { exec } from "child_process";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { setTimeout as delay } from "timers/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JOBS_FILE = path.join(__dirname, "../jobs.json");