import express from "express";
import { createEvent, getEvents, deleteEvent, getEventById, updateEvent } from "../controller/event.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();



//http://localhost:3000/api/v1/events/create-event
router.route("/create-event").post(verifyToken, isAdmin, createEvent);

//http://localhost:3000/api/v1/events/get-events
router.route("/get-events").get(getEvents);

//http://localhost:3000/api/v1/events/delete-event/:id
//http://localhost:3000/api/v1/events/delete-event/:id
router.route("/delete-event/:id").delete(verifyToken, isAdmin, deleteEvent);

//http://localhost:3000/api/v1/events/get-event-by-id/:id
router.route("/get-event-by-id/:id").get(getEventById);

//http://localhost:3000/api/v1/events/update-event/:id
router.route("/update-event/:id").put(verifyToken, isAdmin, updateEvent);

export default router;