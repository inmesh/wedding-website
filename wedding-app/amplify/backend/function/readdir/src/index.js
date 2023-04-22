/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const fs = require("fs");

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  //   await fs.readdir("./node_modules/", function (err, files) {
  //     if (err) {
  //       return console.log("Unable to scan directory: " + err);
  //     }
  //     console.log("didnt fail node_modules");
  //     files.forEach(function (file) {
  //       console.log(file);
  //     });
  //   });

  await fs.readdir("./opt/", function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    console.log("didnt fail opt");
    files.forEach(function (file) {
      console.log(file);
    });
  });

  await fs.readdir("./", function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    console.log("didnt fail ./");
    files.forEach(function (file) {
      console.log(file);
    });
  });
};
