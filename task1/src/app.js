import express from "express";
import cors from "cors";
import { connectToDb } from "./config/db.js";
import eventRoutes from "./routes/event.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import debug from "debug";
import dotenv from "dotenv";
import { initEventService } from "./controllers/event.controller.js";

dotenv.config();

const log = debug("app:server");
const app = express();
const PORT = process.env.PORT || 3000;

//initialize database connection, services and start server
const initServer = async () => {
  try {
    await connectToDb();
    initEventService();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/uploads", express.static("uploads"));
    app.set("view engine", "ejs");

    app.use((req, _, next) => {
      log(`${req.method} to ${req.url} from ${req.headers.host}\n`);
      next();
    });

    // routes
    app.use("/api/v3/app", eventRoutes);

    // error handler
    app.use(errorHandler);

    app.listen(PORT, () => {
      log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    log("Failed to initialize server:", error);
    process.exit(1);
  }
};

initServer();
