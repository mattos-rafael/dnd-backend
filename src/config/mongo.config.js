const mongoose = require("mongoose");

const connectMongo = async () => {
  const mongoURI = process.env.MONGO_URI;
  try {
    if (!mongoURI) throw new Error("Invalid configuration");
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB");
    process.exit(1);
  }
}

module.exports = connectMongo
