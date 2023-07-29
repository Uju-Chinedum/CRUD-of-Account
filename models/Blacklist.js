const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Please provide a token"],
        unique: true,
    },
});

module.exports = mongoose.model("Blacklist", BlacklistSchema);
