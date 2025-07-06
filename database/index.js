const mongoose = require("mongoose");
const uriString = process.env.MONGODB_URI || "mongodb://localhost/greenfield";

console.info("Connecting to database at:", uriString);
mongoose.connect(uriString, {}).catch((err) => {
    console.error("Database connection error:", err);
});

let db = mongoose.connection;
db.on("error", (err) => {
    console.error("Database error:", err);
});
db.once("open", () => {
    console.log("greenfield database connected");
});

module.exports = db;
