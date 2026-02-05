import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "./favorites.controller";

const router = Router();

router.get("/", requireAuth, getFavorites);
router.post("/:songId", requireAuth, addFavorite);
router.delete("/:songId", requireAuth, removeFavorite);

export default router;
