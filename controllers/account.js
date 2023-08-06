const Account = require("../models/Account");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const createAccount = async (req, res) => {
    const account = await Account.create(req.body);
    const checkPassword = account.confirmPassword();
    if (!checkPassword) {
        throw new BadRequest([
            { resource: "Password", message: "Password must match" },
        ]);
    }

    res.status(StatusCodes.CREATED).json({ account });
};

const getAccount = async (req, res) => {
    const { id: accountId } = req.params;
    const account = await Account.findOne({ _id: accountId });

    if (!account) {
        throw new NotFound(`No account with id ${accountId}`);
    }

    res.status(StatusCodes.OK).json({
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        carType: account.carType,
        zipCode: account.zipCode,
        city: account.city,
        country: account.country,
    });
};

const updateAccount = async (req, res) => {
    const { id: accountId } = req.params;
    let account = await Account.findByIdAndUpdate(
        { _id: accountId },
        req.body,
        { new: true, runValidators: true }
    );

    if (!account) {
        throw new NotFound(`No account with id ${accountId}`);
    }
    const checkPassword = account.confirmPassword();
    if (!checkPassword) {
        throw new BadRequest([
            { resource: "Password", message: "Password must match" },
        ]);
    }

    account = await account.save();
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        carType: account.carType,
        zipCode: account.zipCode,
        city: account.city,
        country: account.country,
        token,
    });
};

const deleteAccount = async (req, res) => {
    const { id: accountId } = req.params;

    const account = await Account.findByIdAndRemove({ _id: accountId });
    if (!account) {
        throw new NotFound(`No account with id ${accountId}`);
    }

    res.status(StatusCodes.OK).send();
};

module.exports = {
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount,
};
