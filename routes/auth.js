const express = require("express");
const { login, logout } = require("../controllers/auth");
const authenticateAccount = require("../middleware/authentication");

const router = express.Router();

router.post("/login", login);
router.delete("/logout", authenticateAccount, logout);

module.exports = router;
