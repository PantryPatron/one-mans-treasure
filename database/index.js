const mongoose = require("mongoose");
const uriString = process.env.MONGODB_URI || "mongodb://localhost/greenfield";

console.info("Connecting to database at:", uriString);
mongoose
    .connect(uriString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: true,
        poolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4, // Use IPv4, skip trying IPv6
    })
    .catch((err) => {
        console.error("Database connection error:", err);
        process.exit(1);
    });

let db = mongoose.connection;
db.once("open", () => {
    console.log("greenfield database connected");
});

module.exports = db;
