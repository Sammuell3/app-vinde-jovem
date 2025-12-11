import express from "express";
import { userRegister, userLogin, userLogout } from "../controller/user.controller.js";

const router = express.Router();

router.route("/user-register").post(userRegister);
router.route("/user-login").post(userLogin);
router.route("/user-logout").post(userLogout);

export default router;
