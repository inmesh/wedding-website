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
    if (err) return console.log("Error: ", err);
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

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let resData, resErr;

  await Guest.find()
    .then((data) => {
      console.log(`DATA: ${JSON.stringify(data)}`);
      resData = JSON.stringify(data);
    })
    .catch((err) => {
      console.log(`ERROR: ${JSON.stringify(err)}`);
      resErr = err;
    });
  return resErr
    ? {
        statusCode: 500,
      }
    : {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
        body: resData,
      };
  // console.log(`eof: ${JSON.stringify("end of function")}`);
};
