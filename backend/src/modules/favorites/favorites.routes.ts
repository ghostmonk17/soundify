import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";

import {
  addFavorite,
  removeFavorite,
  getFavorites
} from "./favorites.controller";

const router = Router();

// Get all fav
router.get("/", requireAuth, getFavorites);

// Add fav
router.post("/", requireAuth, addFavorite);

// Remove fav
router.delete("/:id", requireAuth, removeFavorite);

export default router;
