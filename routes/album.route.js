const express = require("express");
const router = express.Router();
const { verifyToken } = require("@middlewares/auth");
const {
  deleteAlbum,
  changeAlbumTitle,
} = require("@controllers/album.controller.js");

router.delete("/delete-album", verifyToken, deleteAlbum);
router.put("/change-album-title", verifyToken, changeAlbumTitle);

module.exports = router;
