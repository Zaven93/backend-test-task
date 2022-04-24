const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const comparePasswords = async (notHashedPassword, hashedPassword) => {
  try {
    const validPassword = await bcrypt.compare(
      notHashedPassword,
      hashedPassword
    );

    return validPassword;
  } catch (error) {
    console.log(error);
  }
};

const createToken = async (userId) => {
  try {
    const token = await jwt.sign(
      {
        userId,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
};

const fetchPhotos = async () => {
  try {
    const { data } = await axios.get(process.env.PHOTOS_ENDPOINT);

    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  comparePasswords,
  createToken,
  fetchPhotos,
};
