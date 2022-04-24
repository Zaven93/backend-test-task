const { Schema, Types, model } = require("mongoose");
const PhotoModel = require("@models/Photo.model.js");

const AlbumSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
    photos: [
      {
        type: Types.ObjectId,
        ref: "Photo",
      },
    ],
  },
  {
    timestamps: true,
  }
);

AlbumSchema.post("remove", (doc) => {
  PhotoModel.remove({
    _id: {
      $in: doc.photos,
    },
  });
});

module.exports = model("Album", AlbumSchema);
