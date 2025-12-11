import express from "express";
import { userRegister, userLogin, userLogout, userDelete, getUsers, getUserById, userUpdate } from "../controller/user.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/user-register").post(userRegister);
router.route("/user-login").post(userLogin);
router.route("/user-logout").post(userLogout);

//apenas admin pode ver todos usuarios (Dashboard)
router.route("/users-get").get(verifyToken, isAdmin, getUsers);
//apenas admin pode deletar usuario
router.route("/user-delete/:id").delete(verifyToken, isAdmin, userDelete);
//apenas admin pode buscar usuario por id
//apenas admin pode buscar usuario por id
//apenas admin pode buscar usuario por id (Ou o proprio usuario, validado no controller)
router.route("/user-get-by-id/:id").get(verifyToken, getUserById);

//apenas admin pode atualizar usuario
//apenas admin pode atualizar usuario (Ou o proprio usuario, validado no controller)
router.route("/user-update/:id").put(verifyToken, userUpdate);

export default router;
