import { Router } from "express";
const router = Router();
import {
  getBooks,
  getBook,
  reviewBook,
  createBook,
  getRelated,
  getSearchBooks,
  admindelete,
} from "./controllers/jobs";
import { requireAuth } from "../utils/authMiddleware";
router.route("/").get(getBooks);
router.route("/search").get(getSearchBooks);
router.route("/:id").get(getBook);
router.route("/:id/reviewBook").post(reviewBook);
router.route("/:id/related").get(getRelated);
export default router;
