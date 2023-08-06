const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AccountSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Pleae provide first name"],
        maxlength: 50,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Pleae provide last name"],
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Pleae provide an email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email",
        ],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
    },
    carType: {
        type: String,
        enum: ["SEDAN", "SUV", "SEMI_LUXURY", "LUXURY"],
        default: "SUV",
    },
    zipCode: {
        type: String,
        required: [true, "Please provide a zip code"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "Please provide a city"],
        trim: true,
    },
    country: {
        type: String,
        required: [true, "Please provide a country"],
        trim: true,
    },
});

AccountSchema.methods.confirmPassword = function () {
    return this.password === this.passwordConfirm;
};

AccountSchema.pre("save", async function () {
    if (!this.modified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = this.password;
});

AccountSchema.methods.createJWT = function () {
    return jwt.sign(
        { accountId: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    );
};

AccountSchema.methods.comparePassword = async function (candidate) {
    const isMatch = await bcrypt.compare(candidate, this.password);
    return isMatch;
};

module.exports = mongoose.model("Account", AccountSchema);
