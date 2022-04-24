const { Schema, Types, model } = require("mongoose");

const PhotoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
  album: {
    type: Types.ObjectId,
    ref: "Album",
  },
});

const validateUrl = (val) => {
  urlRegex =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
};

PhotoSchema.path("url").validate(validateUrl, "Invalid URL.");

PhotoSchema.path("thumbnailUrl").validate(
  validateUrl,
  "Invalid Thumbnail URL."
);

module.exports = model("Photo", PhotoSchema);
