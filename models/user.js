const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]+$/.test(v); // Test if string contains only alphabetic characters
      },
      message: (props) => `${props.value} is not a valid first name!`,
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]+$/.test(v); // Test if string contains only alphabetic characters
      },
      message: (props) => `${props.value} is not a valid first name!`,
    },
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const age = Math.floor(
          (new Date() - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000)
        );

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

  country: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
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
