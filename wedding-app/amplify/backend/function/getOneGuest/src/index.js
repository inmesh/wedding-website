/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
  const Guest = require("/opt/guestmodel");
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
