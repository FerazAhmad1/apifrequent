const User = require("../models/user.js");
const Country = require("../models/country.js");
const State = require("../models/states.js");
const City = require("../models/city.js");

exports.allUser = async (req, res) => {
  const response = await User.find();
  console.log("Alluser", response);
  return [];
};
exports.updateUser = (req, res) => {
  return [];
};

exports.createUser = async (req, res) => {
  console.log("DDDDHHHHHHGGGGHHHHGGHHGHHGHGHGHGGHGH");
  const { firstName, lastName, email, dob, gender, age, country, state, city } =
    req.body;

  const [
    { name: countryName },
    { name: userStatename },
    { name: userCityName },
  ] = await Promise.all([
    Country.findById(country, { name: 1, _id: 0 }),
    State.findById(state, { name: 1, _id: 0 }),
    City.findById(city, { name: 1, _id: 0 }),
  ]);
  const response = await User.create({
    firstName,
    lastName,
    email,
    dob,
    gender,
    country: countryName,
    state: userStatename,
    city: userCityName,
  });
  console.log(response);
  return [];
};
