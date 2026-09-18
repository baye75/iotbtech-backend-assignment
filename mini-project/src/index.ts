import express from 'express'
import { router as productRouter } from './routes/product.routes.ts';
import { initProductService } from "./services/product.service.js";


async function loadProduct(): Promise<void> {
 
  await initProductService();

  const app = express();
  const port = Number(process.env.PORT ?? 3000);
  app.use(express.json());
  app.use("/api/products", productRouter);

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

loadProduct().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
