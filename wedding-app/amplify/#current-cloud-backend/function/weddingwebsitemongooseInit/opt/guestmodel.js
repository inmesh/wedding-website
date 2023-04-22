/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb.net",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw new Error(console.log("Error: ", err));
    console.log(
      "MongoDB Connection -- Ready state is:",
      mongoose.connection.readyState
    );
  }
);

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
  coming_status: {
    type: String,
    default: null,
  },
  category: {
    type: String,
  },
  last_mod: {
    type: Date,
  },
});

const Guest = mongoose.model("Guest", GuestSchema);
module.exports = Guest;
