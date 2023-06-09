const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  expected_guests: {
    type: Number,
  },
  actual_guests: {
    type: Number,
    default: null,
  },
  coming_status: {
    type: String,
    default: null,
  },
  category: {
    type: String,
  },
  send_sms: {
    type: String,
  },
  last_mod: {
    type: Date,
  },
});

const Guest = mongoose.model("guest", GuestSchema);
module.exports = Guest;
