const Account = require("../models/Account");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthorized } = require("../errors");

const createAccount = async (req, res) => {
    const account = await Account.create(req.body);

    res.status(StatusCodes.CREATED).json({ account });
};
