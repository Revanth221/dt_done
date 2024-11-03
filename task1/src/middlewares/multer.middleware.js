import multer from "multer";

const storage = multer.diskStorage({
  destination: function (_, _2, cb) {
    cb(null, "./uploads");
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (_, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    log(`rejecting ${file.originalname} - not an image`);
    cb(new Error("Not an image. Please upload an image."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb size limit
  },
});

export default upload;
