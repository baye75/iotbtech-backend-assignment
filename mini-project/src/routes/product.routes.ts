import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.ts';
import { requireApiKey } from '../middleware/requireApiKey.ts';


 export const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", requireApiKey, createProduct);

router.put("/:id", requireApiKey, updateProduct);

router.delete("/:id", requireApiKey, deleteProduct);
