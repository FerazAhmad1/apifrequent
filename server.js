const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

const PORT = 3000;
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

console.log("password", process.env.DATABASE_PASSWORD, DB);
mongoose
  .connect(DB)
  .then((connection) => {
    console.log(connection);
  })

  .catch((error) => console.log(error));
app.listen(PORT, () => {
  console.log("app is  runniong");
});
