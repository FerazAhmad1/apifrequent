const express = require("express");
const userRouter = require("./routes/user.js");
const countryRouter = require("./routes/country.js");
const stateRouter = require("./routes/state.js");
const cityRouter = require("./routes/city.js");
const { createCity } = require("./controllers/city.js");
const { createCountry } = require("./controllers/country.js");
const cors = require("cors");
const app = express();
app.use(cors("*"));
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/country", countryRouter);
app.use("/api/v1/state", stateRouter);
app.use("/api/v1/city", cityRouter);
module.exports = app;
