const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Successfully conntected to the DB");
  } catch (error) {
    console.log(`Error occured while connection to the DB: ${error.message}`);
  }
};

module.exports = {
  connectDB,
};
