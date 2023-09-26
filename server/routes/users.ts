import { Router } from "express";
import { oAuth, authLogin, authSignup, logout } from "./controllers/jobs";
import { checkAuth } from "../utils/authMiddleware";
const router = Router();

router.route("/checkauth").get(checkAuth);
router.route("/oauth").post(oAuth);
router.route("/auth/login").post(authLogin);
router.route("/auth/signup").post(authSignup);
router.route("/logout").get(logout);
export default router;
