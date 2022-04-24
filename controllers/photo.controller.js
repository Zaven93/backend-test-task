const AlbumModel = require("@models/Album.model.js");
const PhotoModel = require("@models/Photo.model.js");
const { fetchPhotos } = require("@utils");

const uploadPhotos = async (req, res) => {
  try {
    const { userId } = req.user;

    const photos = await fetchPhotos();

    Promise.all(
      photos.map(async (photo) => {
        const newPhoto = new PhotoModel({
          title: photo.title,
          url: photo.url,
          thumbnailUrl: photo.thumbnailUrl,
          owner: userId,
        });

        await newPhoto.save();

        await AlbumModel.findOneAndUpdate(
          { title: photo.albumId },
          {
            title: photo.albumId,
            $push: {
              photos: newPhoto._id,
            },
          },
          {
            upsert: true,
          }
        );
      })
    ).catch((error) => console.log(`Error from promise all ${error.message}`));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPhotos = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const ownerId = req.query.ownerId;
    const maxCount = req.query.maxCount;

    const skip = (page - 1) * maxCount;
    const ownerQuery = ownerId ? { owner: ownerId } : {};

    const photos = await PhotoModel.find(ownerQuery).skip(skip).limit(maxCount);

    return res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const photoIds = req.query.photoId.split(",");

    console.log("Photo ids are", photoIds);

    await Promise.all(
      photoIds.map(async (photoId) => {
        await PhotoModel.findOneAndRemove({ _id: photoId });
      })
    );

    return res.status(200).json({ message: "Successfully removed photo." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadPhotos,
  getPhotos,
  deletePhoto,
};
