import express from "express";
import { joinEvent, myEvents, deleteJoinEvent } from "../controller/join-event-controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Trocamos para '/' pois já está em /api/v1/join-event/
router.route("/").post(verifyToken, joinEvent);

// Ver meus eventos (Protegido pelo Token)
router.route("/my-events/:id").get(verifyToken, myEvents);

// Cancelar inscrição (Protegido pelo Token)
router.route("/delete/:id").delete(verifyToken, deleteJoinEvent);

export default router;
