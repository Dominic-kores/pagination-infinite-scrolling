
import { Router } from "express";

import {
  getProducts,
  getCategories,
} from "../controllers/productController.js";

const router = Router();

// Fetch distinct categories.
router.get("/categories", getCategories);

// Fetch paginated products.
router.get("/", getProducts);

export default router;
