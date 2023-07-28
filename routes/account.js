const express = require("express");
const {
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount,
} = require("../controllers/account");
const authenticateAccount = require("../middleware/authentication");

const router = express.Router();

router.route("/").post(createAccount);
router.get("/:id", authenticateAccount, getAccount);
router.patch("/:id", authenticateAccount, updateAccount);
router.delete("/:id", authenticateAccount, deleteAccount);

module.exports = router;
