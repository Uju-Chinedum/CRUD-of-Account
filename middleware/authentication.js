const { isTokenBlacklisted } = require("./blacklist");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../errors");
const connectDB = require("../db/connect");

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Unauthorized("Authentication Invalid");
    }

    const token = authHeader.split(" ")[1];
    try {
        await connectDB(process.env.MONGO_URI);
        const isBlacklisted = await isTokenBlacklisted(token);
        if (isBlacklisted) {
            return next(new Unauthorized("Invalid or blacklisted token"));
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.account = { accountId: payload.accountId, email: payload.email };
        next();
    } catch (error) {
        throw new Unauthorized("Authentication Invalid");
    }
};

module.exports = auth;
