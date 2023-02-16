const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  expected_guests: {
    type: Number,
  },
  actual_guests: {
    type: Number,
    default: null,
  },
  date: {
    type: Date,
  },
});

const Guest = mongoose.model("Guest", GuestSchema);
module.exports = Guest;
