const multer = require("multer");
const path = require("path");
const checkIfEmpty = require("../utils/checkIfEmpty");
const fs = require("fs");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // console.log({ body: req.body });
    const path = `public/images`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename(req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const { name, date } = req.body;
    const check = checkIfEmpty({ name, date });
    if (check.status) {
      req.status = { status: false, message: check.msg };
      return cb(null, false);
    }
    const acceptedExtensionsList = [".jpg", ".jpeg", ".png"];
    const extname = path.extname(file.originalname).toLowerCase();
    if (acceptedExtensionsList.includes(extname)) {
      req.status = { status: true };
      cb(null, true); // Accept the file
    } else {
      req.status = { status: false, message: "Invalid file extension" };
      cb(null, false); //reject file
    }
  },
});
