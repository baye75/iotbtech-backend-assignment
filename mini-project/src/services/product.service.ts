import { createReadStream, existsSync } from "node:fs";
import { createInterface } from "node:readline";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";


export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export type NewProduct = Omit<Product, "id">;
export type ProductUpdate = Partial<NewProduct>;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, "..", "..");
const CSV_PATH = join(PROJECT_ROOT, "data", "products.csv");

const products: Product[] = [];
let nextId = 1;
let initialized = false;


export async function initProductService(): Promise<void> {
  if (initialized) return;

  if (!existsSync(CSV_PATH)) {
    throw new Error(`Products file not found: ${CSV_PATH}`);
  }

  const rl = createInterface({
    input: createReadStream(CSV_PATH, { encoding: "utf8" }),
    crlfDelay: Infinity,
  });

  let isHeader = true;

  for await (const line of rl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    if (!line) continue;

    const parts = line.split(",");
    if (parts.length < 5) continue;

    
    const name = parts[1]!;
    const category = parts[2]!;
    const price = parseFloat(parts[3]!);
    const stock = parseInt(parts[4]!, 10);

    products.push({
      id: nextId++,
      name,
      category,
      price,
      stock,
    });
  }

  initialized = true;
}


export function findAllProducts(): Product[] {
  return products;
}

export function findProductById(id: number): Product | null {
  return products.find((p) => p.id === id) ?? null;
}


export function createProduct(data: NewProduct): Product {
  const product: Product = {
    id: nextId++,
    name: data.name,
    category: data.category,
    price: data.price,
    stock: data.stock,
  };
  products.push(product);
  return product;
}

export function updateProduct(id: number, data: ProductUpdate): Product | null {
  const product = products.find((p) => p.id === id);
  if (!product) return null;

  if (data.name !== undefined) product.name = data.name;
  if (data.category !== undefined) product.category = data.category;
  if (data.price !== undefined) product.price = data.price;
  if (data.stock !== undefined) product.stock = data.stock;

  return product;
}

export function deleteProduct(id: number): Product | null {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const [removed] = products.splice(index, 1);
  return removed ?? null;
}
