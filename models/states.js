const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  cities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
  ],
});
const State = mongoose.model("State", stateSchema);
module.exports = State;
