import { Router } from "express";
import { getSongs, searchSongs } from "./music.controller";

const router = Router();

router.get("/", getSongs);
router.get("/search", searchSongs);

export default router;
