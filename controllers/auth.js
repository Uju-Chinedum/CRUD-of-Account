const Account = require("../models/Account");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthorized } = require("../errors");

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest("Please provide email/password");
    }

    const account = await Account.findOne({ email });
    if (!account) {
        throw new Unauthorized([
            { resource: "Email", message: "Invalid email" },
        ]);
    }

    const checkPassword = await account.comparePassword(password);
    if (!checkPassword) {
        throw new Unauthorized([
            { resource: "Password", message: "Invalid password" },
        ]);
    }

    const token = account.createJWT();
    res.status(StatusCodes.OK).json({
        token,
        user: {
            _id: account._id,
            firstName: account.firstName,
            lastName: account.lastName,
        },
    });
};

const logout = async (req, res) => {
    //     const { email, password } = req.body;
    //     if (!email || !password) {
    //         throw new BadRequest("Please provide email/password");
    //     }
};

module.exports = {
    login,
    logout,
};
