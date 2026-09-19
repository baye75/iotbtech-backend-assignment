import express from 'express'
import { router as productRouter } from './routes/product.routes.ts';
import { initProductService } from "./services/product.service.js";
import { requestLogger } from './middleware/requestLogger.ts';
import { notFoundHandler } from './middleware/notFoundHandler.ts';
import { errorHandler } from './middleware/errorHandler.ts';

async function loadProduct(): Promise<void> {
 
  await initProductService();

  const app = express();
  app.use(requestLogger);
  app.use(express.json());
  app.use("/api/products", productRouter);
  app.get("/boom", (_req, _res) => {
    throw new Error("Kaboom!");
  });
  app.use(notFoundHandler);
  app.use(errorHandler);
  const port = Number(process.env.PORT ?? 3000);
  
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

loadProduct().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

// const app = express();
// app.use(requestLogger);
// app.use(express.json());
// app.use("/api/products", productRouter);
// app.use(notFoundHandler);
// app.use(errorHandler);
// const PORT = process.env.PORT ?? 3000;
// app.listen(PORT, () => console.log(`API on :${PORT}`));
