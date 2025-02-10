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

// ********DISK STORAGE CONFIGURATION*********
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
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
const upload2 = multer({
  storage2,
  fileFilter2,
  limits: {
    fileSize: 1024 * 1024 * 2 // 2MB file size limit
  }
});

module.exports = {
  upload2
};

// *********MEMORY STORAGE CONFIGURATION************
const multer = require("multer");
const path = require("path");

// Set up storage (memoryStorage for processing before upload)
const storage3 = multer.memoryStorage();

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

const upload3 = multer({
  storage3,
  fileFilter3,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB file size limit
});

module.exports = { upload3 };
