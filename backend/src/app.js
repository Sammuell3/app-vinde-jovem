import express from "express";

const app = express();

app.use(express.json());

import userRouter from "../routes/user.route.js";
import eventRouter from "../routes/event.route.js";
import joinEventRouter from "../routes/join-event-route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/events", eventRouter, joinEventRouter);
export default app;