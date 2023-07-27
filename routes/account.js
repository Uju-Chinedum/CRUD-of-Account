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
app.use(authenticateAccount)
router.route("/:id").get(getAccount).patch(updateAccount).delete(deleteAccount);

module.exports = router;
