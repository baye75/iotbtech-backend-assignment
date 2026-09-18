import type { Request, Response } from "express";
import { findAllProducts,findProductById, createProduct as createProductService, updateProduct as updateProductService, deleteProduct as deleteProductService, type NewProduct, type ProductUpdate } from "../services/product.service.js";


export function getAllProducts(req: Request, res: Response): void {
  const categoryQuery = req.query.category;
  let products = findAllProducts();

  if (typeof categoryQuery === "string" && categoryQuery.trim() !== "") {
    const category = categoryQuery.trim().toLowerCase();
    products = products.filter((p) => p.category.toLowerCase() === category);
  }

  res.status(200).json({ count: products.length, products });
}


export function getProductById(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid product id" });
    return;
  }

  const product = findProductById(id);
  if (product === null) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.status(200).json(product);
}


export function createProduct(req: Request, res: Response): void {
  const body = req.body ?? {};
  const { name, price, category, stock } = body;

  
  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof price !== "number" ||
    !Number.isFinite(price)
  ) {
    res.status(400).json({ error: "name and price are required" });
    return;
  }

  const data: NewProduct = {
    name: name.trim(),
    price,
    category: typeof category === "string" && category.trim() !== "" ? category.trim() : "uncategorized",
    stock: typeof stock === "number" && Number.isFinite(stock) ? stock : 0,
  };

  const created = createProductService(data);
  res.status(201).json(created);
}


export function updateProduct(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid product id" });
    return;
  }

  const body = req.body ?? {};
  const update: ProductUpdate = {};

 
  if (typeof body.name === "string" && body.name.trim() !== "") {
    update.name = body.name.trim();
  }
  if (typeof body.category === "string" && body.category.trim() !== "") {
    update.category = body.category.trim();
  }
  if (typeof body.price === "number" && Number.isFinite(body.price)) {
    update.price = body.price;
  }
  if (typeof body.stock === "number" && Number.isFinite(body.stock)) {
    update.stock = body.stock;
  }

  const updated = updateProductService(id, update);
  if (updated === null) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.status(200).json(updated);
}


export function deleteProduct(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid product id" });
    return;
  }

  const deleted = deleteProductService(id);
  if (deleted === null) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.status(200).json({ deleted: true, id });
}
