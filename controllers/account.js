const Account = require("../models/Account");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const createAccount = async (req, res) => {
    const account = await Account.create(req.body);
    const checkPassword = await account.confirmPassword();
    if (!checkPassword) {
        throw new BadRequest([
            { resource: "Password", message: "Password must match" },
        ]);
    }

    res.status(StatusCodes.CREATED).json({
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        carType: account.carType,
        zipCode: account.zipCode,
        city: account.city,
        country: account.country,
    });
};

const getAccount = async (req, res) => {
    const { id: accountId } = req.params;
    const account = await Account.findOne({ _id: accountId }).select(
        "-password -passwordConfirm"
    );

    if (!account) {
        throw new NotFound(`No account with id ${accountId}`);
    }

    res.status(StatusCodes.OK).json({ account });
};

const updateAccount = async (req, res) => {
    const { id: accountId } = req.params;

    const account = await Account.findByIdAndUpdate(
        { _id: accountId },
        req.body,
        { new: true, runValidators: true }
    ).select("-password -passwordConfirm");
    if (!account) {
        throw new NotFound(`No account with id: ${accountId}`);
    }

    await account.confirmUser(req, accountId);
    const token = account.createJWT();

    res.status(StatusCodes.OK).json({ account });
};

const updatePassword = async (req, res) => {
    const { id: accountId } = req.params;
    const { oldPassword, newPassword, newPasswordConfirm } = req.body;
    if (!oldPassword || !newPassword || !newPasswordConfirm) {
        throw new BadRequest("Please provide all details");
    }

    const account = await Account.findOne({ _id: accountId });
    if (!account) {
        throw new NotFound(`No account with id: ${accountId}`);
    }

    await account.confirmUser(req, accountId);

    password = await account.comparePassword(oldPassword);
    if (!password || newPassword !== newPasswordConfirm) {
        throw new BadRequest("Incorrect Password");
    }

    account.password = newPassword;
    account.passwordConfirm = account.password;

    await account.save();
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

const deleteAccount = async (req, res) => {
    const { id: accountId } = req.params;

    const account = await Account.findOne({ _id: accountId });
    if (!account) {
        throw new NotFound(`No account with id ${accountId}`);
    }

    await account.confirmUser(req, accountId);
    await account.remove();
    res.status(StatusCodes.OK).send();
};

module.exports = {
    createAccount,
    getAccount,
    updateAccount,
    updatePassword,
    deleteAccount,
};
