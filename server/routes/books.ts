import { Router } from "express";
const router = Router();
import {
  getBooks,
  getBook,
  reviewBook,
  createBook,
  getRelated,
  getSearchBooks,
} from "./controllers/jobs";
import { requireAuth } from "../utils/authMiddleware";
router.route("/").get(getBooks);
router.route("/search").get(getSearchBooks);
router.route("/sellbook").post(requireAuth, createBook);
router.route("/:id").get(getBook);
router.route("/:id/reviewBook").post(reviewBook);

router.route("/:id/related").get(getRelated);

export default router;
