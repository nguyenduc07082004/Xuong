import { Router } from "express";
import authRouter from "./auth";
import categoriesRouter from "./categories";
import productsRouter from "./products";
import cartsRouter from "./cart";

const router = Router();

router.get("/", (req, res) => {
  res.send("Home");
});

router.use("/users", authRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/cart", cartsRouter);
export default router;
