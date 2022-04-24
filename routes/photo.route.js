const express = require("express");
const router = express.Router();

const { verifyToken } = require("@middlewares/auth");
const {
  uploadPhotos,
  getPhotos,
  deletePhoto,
} = require("@controllers/photo.controller.js");

router.post("/upload-photos", verifyToken, uploadPhotos);
router.get("/get-photos", getPhotos);
router.delete("/delete-photo", verifyToken, deletePhoto);

module.exports = router;
