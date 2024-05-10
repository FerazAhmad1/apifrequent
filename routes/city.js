const express = require("express");
const { getCities, createCity } = require("../controllers/city");

const router = express.Router();

router.route("/").post(createCity);
router.route("/:id").get(getCities);
module.exports = router;
