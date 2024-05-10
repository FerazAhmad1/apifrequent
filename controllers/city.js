const City = require("../models/city.js");
const State = require("../models/states.js");
exports.getCities = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id)
      throw {
        message: "Bad request",
        errormessage: "please send state _id in params",
        errorCode: 400,
      };
    const citiesId = await State.findById(_id, { cities: 1 });
    const cities = await Promise.all(
      citiesId.cities.map((id) => City.findById(id, { name: 1, _id: 1 }))
    );

    res.status(200).json({
      success: true,
      data: {
        cities,
      },
    });
  } catch (error) {
    res.status(error.erroCode).json({
      message: error.message,
      error: error.errormessage,
    });
  }
};

exports.createCity = async (req, res) => {
  try {
    const state = req.body.state;
    const cities = req.body.city;
    const response = await Promise.all(cities.map((city) => City.create(city)));
    const cityIds = response.map((city) => city._id);

    const updateResponse = await State.updateOne(state, {
      $addToSet: { cities: { $each: cityIds } },
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
