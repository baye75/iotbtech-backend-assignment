import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, "..");
const INPUT_FILE = join(PROJECT_ROOT, "data", "products.csv");
const OUTPUT_FILE = join(PROJECT_ROOT, "data", "category-summary-naive.csv");

function main() {
  const start = performance.now();

 
  const content = readFileSync(INPUT_FILE, "utf8");

 
  const lines = content.split("\n");

  let rowCount = 0;
  let grandTotal = 0;
  const totals = new Map<string, number>();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const parts = line.split(",");
    if (parts.length < 5) continue;

    const category = parts[2]!;
    const price = parseFloat(parts[3]!);
    const stock = parseInt(parts[4]!, 10);

    const total = price * stock;
    grandTotal += total;
    totals.set(category, (totals.get(category) ?? 0) + total);
    rowCount++;
  }

  const rows = ["category,total"];
  for (const [category, total] of totals) {
    rows.push(`${category},${total.toFixed(2)}`);
  }
  writeFileSync(OUTPUT_FILE, rows.join("\n") + "\n", "utf8");

  const runtime = performance.now() - start;
  const heapMB = process.memoryUsage().heapUsed / 1024 / 1024;

  console.log(`[readFileSync] grand total: $${grandTotal.toFixed(2)}`);
  console.log(`[readFileSync] rows: ${rowCount}`);
  console.log(`[readFileSync] runtime: ${runtime.toFixed(2)} ms`);
  console.log(`[readFileSync] heapUsed: ${heapMB.toFixed(2)} MB`);
}

main();
