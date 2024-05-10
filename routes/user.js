const express = require("express");
const { allUser, createUser, updateUser } = require("../controllers/user");

const router = express.Router();

router.route("/").get(allUser).patch(updateUser).post(createUser);

module.exports = router;
