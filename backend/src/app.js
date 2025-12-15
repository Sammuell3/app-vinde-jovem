import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

import userRouter from "../routes/user.route.js";
import eventRouter from "../routes/event.route.js";
import joinEventRouter from "../routes/join-event-route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/join-events", joinEventRouter);
export default app;