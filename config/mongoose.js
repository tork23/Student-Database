const mongoose = require("mongoose");
const env = require("./environment");

mongoose.set("strictQuery", false);

// Connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

const db = mongoose.connection;

db.once("open", () => {
  console.log("connected to MongoDb ::", env.db);
});

module.exports = db;
