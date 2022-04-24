const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    albums: [
      {
        type: Types.ObjectId,
        ref: "Album",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (this.isModified("password") || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;
      return next();
    }
    return next();
  } catch (error) {
    console.log(error);
  }
});

module.exports = model("User", UserSchema);
