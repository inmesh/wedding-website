/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["mongooseUrl"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const Guest = require("/opt/guestmodel");

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let resData, resErr;
  const method = event.httpMethod;

  if (!(event.pathParameters && event.pathParameters.id))
    return console.log("no id");

  switch (method) {
    case "POST":
      await Guest.findOne({ _id: event.pathParameters.id })
        .then((data) => {
          const body = JSON.parse(event.body);
          data.actual_guests = body.actual_guests;
          data.coming_status = body.coming_status;
          data.last_mod = new Date();
          data.save((err) => {
            if (err) {
              resErr = err;
            }
            resData = JSON.stringify(data);
          });
        })
        .catch((err) => {
          console.log(`ERROR: ${JSON.stringify(err)}`);
          resErr = err;
          process.exit();
        });
      break;
    default:
      await Guest.findOne({ _id: event.pathParameters.id })
        .then((data) => {
          console.log(`DATA: ${JSON.stringify(data)}`);
          resData = JSON.stringify(data);
        })
        .catch((err) => {
          console.log(`ERROR: ${JSON.stringify(err)}`);
          resErr = err;
          process.exit();
        });
  }

  return resErr
    ? {
        statusCode: 500,
      }
    : {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: resData,
      };
};
