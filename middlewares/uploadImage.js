let multer = require("multer");
let path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/image/"));
  },
  filename: (req, file, cb) => {
    const newFilename = file.originalname;
    cb(null, newFilename);
  },
});

const uploadFile = multer({ storage });

module.exports = uploadFile;
