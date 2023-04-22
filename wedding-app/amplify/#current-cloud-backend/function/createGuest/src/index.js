/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
  const Guest = require("/opt/guestmodel");
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let resData, resErr;
  const method = event.httpMethod;

  switch (method) {
    case "POST":
      const body = JSON.parse(event.body);

      //   const newGuest = new Guest({
      //     name: body.name,
      //     phone: body.phone,
      //     expected_guests: body.expected_guests,
      //     actual_guests: body.actual_guests,
      //     coming_status: body.coming_status,
      //     last_mod: new Date(),
      //   });
      //   console.log("new guest created: ", newGuest);

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
