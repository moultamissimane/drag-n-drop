const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL); 
// MONGO_URL = mongodb+srv://imane:imane123@cluster0.trbgah0.mongodb.net/dragndrop
// you can use this string instead og MONGO_URL variable

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Mongo Db Connection Successful");
});

db.on("error", () => {
    console.log("Mongo Db Connection Failed");
});