import express from "express";
import {
    joinEvent, myEvents, deleteJoinEvent, leaveEventByEventId,
    getUsersByEvent
} from "../controller/join-event-controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Mounted at /api/v1/join-events
router.route("/").post(verifyToken, joinEvent);

// Ver meus eventos (Protegido pelo Token)
router.route("/my-events/:id").get(verifyToken, myEvents);

// Cancelar inscrição (Protegido pelo Token)
router.route("/delete/:id").delete(verifyToken, deleteJoinEvent);

// Sair do evento pelo ID do evento (Mais fácil pro frontend)
router.route("/leave/:eventId").delete(verifyToken, leaveEventByEventId);

// Retorna usuários de um evento (Admin)
router.get("/event/:eventId/users", verifyToken, getUsersByEvent);

export default router;
