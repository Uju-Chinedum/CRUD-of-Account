const express = require("express");
const { createAccount } = require("../controllers/account");

const router = express.Router();

router.route("/").get().post(createAccount);
router.route("/:id").get().patch().delete();

module.exports = router;
