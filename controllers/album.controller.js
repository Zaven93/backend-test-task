const AlbumModel = require("@models/Album.model.js");

const deleteAlbum = async (req, res) => {
  try {
    const albumIds = req.query.albumId.split(",");

    await Promise.all(
      albumIds.map(async (albumId) => {
        await AlbumModel.findOneAndRemove({ _id: albumId });
      })
    );

    res.status(200).json({ message: "Album successfully removed." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeAlbumTitle = async (req, res) => {
  try {
    const albumId = req.query.albumId;
    const title = req.query.new_album_name;

    await AlbumModel.findOneAndUpdate(
      { _id: albumId },
      {
        title,
      }
    );

    res.status(200).json({ message: "Album title successfully updated." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteAlbum,
  changeAlbumTitle,
};
