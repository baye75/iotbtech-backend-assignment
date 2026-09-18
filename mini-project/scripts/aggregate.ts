import { createReadStream, createWriteStream, mkdirSync, existsSync } from "node:fs";
import { createInterface } from "node:readline";
import { join, dirname, isAbsolute, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, "..");

const INPUT_FILE = join(PROJECT_ROOT, "data", "products.csv");


const rawOut = process.env.OUTFile ?? "data/category-summary.csv";
const OUTPUT_FILE = isAbsolute(rawOut) ? rawOut : resolve(PROJECT_ROOT, rawOut);
const OUTPUT_DIR = dirname(OUTPUT_FILE);


const money = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatMoney = (n: number): string => "$" + money.format(n);


async function aggregate(): Promise<void> {
  
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const start = performance.now();

  
  const rl = createInterface({
    input: createReadStream(INPUT_FILE, { encoding: "utf8" }),
    crlfDelay: Infinity,
  });

  let rowCount = 0;
  let grandTotal = 0;
  const totals = new Map<string, number>();
  let isHeader = true;

 
  for await (const line of rl) {
    if (isHeader) {
      isHeader = false;
      continue; 
    }
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

  
  const sorted = [...totals.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  
  for (const [category, total] of sorted) {
    console.log(`${category} → ${formatMoney(total)}`);
  }

  
  await new Promise<void>((resolveP, rejectP) => {
    const out = createWriteStream(OUTPUT_FILE, { encoding: "utf8" });
    out.on("error", rejectP);
    out.on("finish", () => resolveP());
    out.write("category,total\n");
    for (const [category, total] of sorted) {
      out.write(`${category},${total.toFixed(2)}\n`);
    }
    out.end();
  });

  const runtime = performance.now() - start;
  const heapMB = process.memoryUsage().heapUsed / 1024 / 1024;

  console.log(`grand total: ${formatMoney(grandTotal)}`);
  console.log(`rows: ${rowCount}`);
  console.log(`runtime: ${runtime.toFixed(2)} ms`);
  console.log(`heapUsed: ${heapMB.toFixed(2)} MB`);
  console.log(`wrote summary → ${relative(PROJECT_ROOT, OUTPUT_FILE)}`);
}

aggregate().catch((err) => {
  console.error("aggregate failed:", err);
  process.exit(1);
});
