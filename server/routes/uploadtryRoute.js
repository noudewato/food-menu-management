const express = require("express");
const tryRouter = express.Router();
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './client/public/images')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})

const upload = multer({
    storage: fileStorageEngine
})

tryRouter.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("single file uplaoding successfully");
});


module.exports = tryRouter;