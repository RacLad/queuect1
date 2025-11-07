import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JOBS_FILE = path.join(__dirname, "../jobs.json");

function readJobsFile() {
  if (!fs.existsSync(JOBS_FILE)) {
    fs.writeFileSync(JOBS_FILE, JSON.stringify({ jobs: [], dlq: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(JOBS_FILE));
}

export async function showJobs() {
  const data = readJobsFile();
  const { jobs } = data;

  if (jobs.length === 0) {
    console.log(chalk.yellow("No jobs in the queue."));
    return;
  }

  console.log(chalk.blueBright("\n🧾 Current Jobs in Queue:\n"));
  jobs.forEach((job) => {
    console.log(
      `${chalk.cyan(job.id)} | ${chalk.white(job.command)} | ${chalk.magenta(job.state)} | Attempts: ${job.attempts}`
    );
  });
  console.log();
}

export async function showDLQ() {
  const data = readJobsFile();
  const { dlq } = data;

  if (dlq.length === 0) {
    console.log(chalk.yellow("Dead Letter Queue is empty."));
    return;
  }

  console.log(chalk.redBright("\n💀 Dead Letter Queue:\n"));
  dlq.forEach((job) => {
    console.log(
      `${chalk.red(job.id)} | ${chalk.white(job.command)} | ${chalk.gray(`Failed after ${job.attempts} attempts`)}`
    );
  });
  console.log();
}

export function moveToDLQ(job) {
  const data = readJobsFile();
  data.jobs = data.jobs.filter((j) => j.id !== job.id);
  data.dlq.push(job);
  fs.writeFileSync(JOBS_FILE, JSON.stringify(data, null, 2));
  console.log(chalk.red(`Moved job ${job.id} to DLQ`));
}
