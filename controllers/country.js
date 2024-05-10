const Country = require("../models/country.js");

exports.getAllCountry = async (req, res) => {
  try {
    const response = await Country.find({}, { _id: 1, name: 1 });
    console.log(response);
    res.status(200).json({
      success: true,
      data: response,
      error: null,
    });
  } catch (error) {
    console.log(error, error.message);
  }
};

exports.createCountry = async (req, res) => {
  const countries = req.body.country;

  const response = await Promise.all(
    countries.map((country) => Country.create(country))
  );

  res.status(200).json({
    success: true,
  });
};
