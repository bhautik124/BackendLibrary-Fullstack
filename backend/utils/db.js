const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(uri);
    if (connect) {
      console.log("mongo connected successfully");
    } else {
      console.log("error while connecting mongo");
    }
  } catch (error) {
    console.log(error.message, "error while connecting mongo");
  }
};

module.exports = connectDb;
