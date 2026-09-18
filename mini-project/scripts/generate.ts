import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";import { fileURLToPath } from "node:url";

const ROWS = Number(process.env.ROWS ?? "10000");
const CATEGORIES = ["electronics", "clothing", "books", "home", "toys", "food"] as const;
const __filename = fileURLToPath(import.meta.url);const __dirname = dirname(__filename);
const OUTPUT_DIR = join(__dirname, "..", "data");
const OUTPUT_FILE = join(OUTPUT_DIR, "products.csv");

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;};

function randomPrice(min: number, max: number): string {
    const value = Math.random() * (max - min) + min;
    return value.toFixed(2);};

function generateCsv(rows: number): string {
    const lines: string[] = ["id,name,category,price,stock"];  
    for (let i = 1; i <= rows; i++) {
        const category = CATEGORIES[randomInt(0, CATEGORIES.length - 1)];    const name = `${category}-${i}`;
        const price = randomPrice(5, 1000);
        const stock = randomInt(0, 500);  lines.push(`${i},${name},${category},${price},${stock}`);  
    }
return lines.join("\n") + "\n"; };

function main() {
    if (!existsSync(OUTPUT_DIR)) {
        mkdirSync(OUTPUT_DIR, { recursive: true });  
    };

const csv = generateCsv(ROWS);

writeFileSync(OUTPUT_FILE, csv, "utf8");

console.log(`Generated ${ROWS} rows -> data/products.csv`);
};

main();
