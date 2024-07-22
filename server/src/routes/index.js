import { Router } from "express";
import authRouter from "./auth";
import categoriesRouter from "./categories";
import productsRouter from "./products";

const router = Router();

router.get("/", (req, res) => {
  res.send("Home");
});

router.use("/users", authRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);

export default router;
