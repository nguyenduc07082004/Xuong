import { Router } from "express";
import ProductsController from "../controllers/products";

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get("/", productsController.getAllProducts);
productsRouter.get("/:id", productsController.getProductDetail);
productsRouter.post("/add", productsController.createProduct);
productsRouter.put("/edit/:id", productsController.updateProduct);
productsRouter.delete("/:id", productsController.deleteProduct);

export default productsRouter;
