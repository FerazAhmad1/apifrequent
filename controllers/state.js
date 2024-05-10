const Country = require("../models/country.js");
const State = require("../models/states.js");

exports.getState = async (req, res) => {
  const { id: _id } = req.params;
  try {
    console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", _id);
    if (!_id)
      throw {
        message: "Bad request",
        errormessage: "please send state _id in params",
        errorCode: 400,
      };
    const statesId = await Country.findById(_id, { states: 1 });
    const states = await Promise.all(
      statesId.states.map((id) => State.findById(id, { name: 1, _id: 1 }))
    );
    console.log(states);
    res.status(200).json({
      success: true,
      data: {
        states,
      },
    });
  } catch (error) {
    res.status(error.erroCode).json({
      message: error.message,
      error: error.errormessage,
    });
  }
};

exports.createState = async (req, res) => {
  const states = req.body.state;
  const country = req.body.country;

  const response = await Promise.all(
    states.map((state) => State.create(state))
  );

  const stateIds = response.map((state) => state._id);

  const updateResponse = await Country.updateOne(country, {
    $addToSet: { states: { $each: stateIds } },
  });

  res.status(200).json({ status: "success" });
};
