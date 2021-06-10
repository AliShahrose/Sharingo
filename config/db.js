const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      // Getting rid of deprecation warnings
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    // Kill the server if Database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
