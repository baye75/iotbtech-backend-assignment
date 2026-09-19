import winston from "winston";
// import { mkdirSync, existsSync } from "node:fs";
// import { join, dirname } from "node:path";
// import { fileURLToPath } from "node:url";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const PROJECT_ROOT = join(__dirname, "..", "..");
// const LOG_DIR = join(PROJECT_ROOT, "logs");
// const LOG_FILE = join(LOG_DIR, "app.log");


// if (!existsSync(LOG_DIR)) {
//   mkdirSync(LOG_DIR, { recursive: true });
// }


const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
});


export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}]`
    })
   
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.logs" }),
  ],
});

