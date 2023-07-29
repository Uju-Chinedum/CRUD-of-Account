const Blacklist = require("../models/Blacklist");

const addToBlacklist = async (token) => {
    const blacklistToken = new Blacklist({ token });
    await blacklistToken.save();
};

const isTokenBlacklisted = async (token) => {
    const blacklistToken = await Blacklist.findOne({ token });
    return !!blacklistToken;
};

module.exports = {
    addToBlacklist,
    isTokenBlacklisted,
};
