import { Router } from "express";
import {
  getSongs,
  searchSongs
} from "./music.controller";

const router = Router();

// Get songs
router.get("/", getSongs);

// Search songs
router.get("/search", searchSongs);

export default router;
