/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const Guest = require("/opt/guestmodel");

const AWS = require("aws-sdk");
const SNSClient = new AWS.SNS();

exports.handler = async (event) => {
  try {
    const resp = await SNSClient.publish({
      Message: "testtttt",
      PhoneNumber: "+972547680150",
    }).promise();
    console.log("sms:", resp);
  } catch (e) {
    console.log(e);
  }

  console.log(`EVENT: ${JSON.stringify(event)}`);
  let resData, resErr;
  const method = event.httpMethod;

  switch (method) {
    case "POST":
      const body = JSON.parse(event.body);

      await Guest.create({
        name: body.name,
        phone: body.phone,
        expected_guests: body.expected_guests,
        actual_guests: body.actual_guests,
        coming_status: body.coming_status,
        last_mod: new Date(),
      })
        .then((data) => {
          console.log("save s", data);
          resData = JSON.stringify(data);
        })
        .catch((err) => {
          resErr = err;
          console.log("save err", err);
          process.exit();
        });
      break;
    default:
      resErr = "bad Method";
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
