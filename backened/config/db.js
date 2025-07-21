const mongoose = require("mongoose");
require('dotenv').config()
const mongo_uri = process.env.mongoURI;
const connection = mongoose
  .connect(
    mongo_uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

module.exports = connection;
