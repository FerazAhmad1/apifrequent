const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Calculate age based on date of birth
        const age = Math.floor(
          (new Date() - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000)
        );
        // Validate age falls within range (14 to 99 years)
        return age >= 14 && age <= 99;
      },
      message: "Age must be between 14 and 99 years",
    },
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  // Reference to Country
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country", // Reference to the Country model
  },
  // Reference to City
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City", // Reference to the City model
  },
  // Reference to State
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State", // Reference to the State model
  },
});

// Pre-save hook to calculate age based on date of birth
userSchema.pre("save", function (next) {
  // Calculate age based on date of birth
  const age = Math.floor(
    (new Date() - new Date(this.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000)
  );
  this.age = age;
  next();
});

// Compile model from schema
const User = mongoose.model("User", userSchema);

module.exports = User;
