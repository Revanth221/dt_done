import express from "express";
import upload from "../middlewares/multer.middleware.js";
import {
  handleGetEvents,
  handleCreateEvent,
  handleUpdateEvent,
  handleDeleteEvent,
} from "../controllers/event.controller.js";

const router = express.Router();

router
  .route("/events")
  .get(handleGetEvents)
  .post(upload.single("image"), handleCreateEvent);

router.put("/events/:id", upload.single("image"), handleUpdateEvent);
router.delete("/events/:id", handleDeleteEvent);

export default router;
