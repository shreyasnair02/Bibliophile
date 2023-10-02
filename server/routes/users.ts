import { Router } from "express";
import {
  oAuth,
  authLogin,
  authSignup,
  logout,
  addToCart,
} from "./controllers/jobs";
import { checkAuth, requireAuth } from "../utils/authMiddleware";
const router = Router();

router.route("/checkauth").get(checkAuth);
router.route("/oauth").post(oAuth);
router.route("/auth/login").post(authLogin);
router.route("/auth/signup").post(authSignup);
router.route("/logout").get(logout);
router.route("/cart").post(requireAuth, addToCart);
export default router;
