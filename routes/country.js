const express = require("express");
const { getAllCountry, createCountry } = require("../controllers/country");

const router = express.Router();

router.route("/").get(getAllCountry).post(createCountry);
module.exports = router;
