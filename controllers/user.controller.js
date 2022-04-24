const UserModel = require("@models/User.model.js");
const { comparePasswords, createToken } = require("@utils");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new UserModel({
      username,
      email,
      password,
    });

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await UserModel.find({
      $or: [{ username: login }, { email: login }],
    });

    const isValid = await comparePasswords(password, user[0].password);

    if (!isValid)
      return res.status(401).json({ message: "Password is not valid." });

    const token = await createToken(user[0]._id);

    return res.status(200).json(token);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
