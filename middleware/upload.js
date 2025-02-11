// ********DIRECT STORAGE ON  CLOUDINARY*******
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Set up storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Contact-Images", // Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

// Initialize Multer
const upload = multer({ storage });

module.exports = { upload };

// ********DISK STORAGE CONFIGURATION*******
const multer2 = require("multer");
const path2 = require("path");
const fs2 = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs2.existsSync(uploadDir)) {
  fs2.mkdirSync(uploadDir, { recursive: true });
}

// Set storage engine
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".jpeg") ext = ".jpg";
    cb(null, file.fieldname + "-" + Date.now() + ext);
  }
});

// File filter function
const fileFilter2 = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

// Multer Middleware
const upload2 = multer2({
  storage2,
  fileFilter2,
  limits: {
    fileSize: 1024 * 1024 * 2 // 2MB file size limit
  }
});

module.exports = {
  upload2
};

// *********MEMORY STORAGE CONFIGURATION*********
const multer3 = require("multer");
const path3 = require("path");

// Set up storage (memoryStorage for processing before upload)
const storage3 = multer3.memoryStorage();

const fileFilter3 = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."),
      false
    );
  }
};

const upload3 = multer3({
  storage3,
  fileFilter3,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB file size limit
});

module.exports = { upload3 };
