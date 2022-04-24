require("module-alias/register");
require("dotenv").config();
const express = require("express");
const app = express();

const { connectDB } = require("@db");
const userRouter = require("@routes/user.route.js");
const photoRouter = require("@routes/photo.route.js");
const albumRouter = require("@routes/album.route.js");

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/photo", photoRouter);
app.use("/api/album", albumRouter);

const boostServer = async () => {
  await connectDB();

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

boostServer();
