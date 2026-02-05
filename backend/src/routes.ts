import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes";
import musicRoutes from "./modules/music/music.routes";
import favoritesRoutes from "./modules/favorites/favorites.routes";
const router = Router();
router.use("/auth", authRoutes);
router.use("/music", musicRoutes);     
router.use("/favorites", favoritesRoutes);
export default router;
