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
router
    .route("/:id")
    .get(getAccount, authenticateAccount)
    .patch(updateAccount, authenticateAccount)
    .delete(deleteAccount, authenticateAccount);

module.exports = router;
