//this will handle all errors thrown in the app
import debug from "debug";

const log = debug("app:error");

const errorHandler = (err, _, res, next) => {
  log("Error:", err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
