const express = require("express");
const { getState, createState } = require("../controllers/state");

const router = express.Router();

router.route("/").post(createState);
router.route("/:id").get(getState);

module.exports = router;
