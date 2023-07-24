require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();

app.use(express.json());

// app.use("/api/v1/account")

const port = process.env.PORT || 3000

const start = async () => {
    try {
        console.log("Server is listening on port 3000...");
    } catch (error) {
        console.log(error);
    }
}
