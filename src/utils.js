import crypto from "crypto";

/**
 * Generate a unique job ID
 * @returns {string} unique job id
 */
export function generateJobId() {
  return crypto.randomBytes(8).toString("hex"); // e.g. "a1b2c3d4e5f6g7h8"
}