const validatePhone = require("./server/utils");
const fs = require("fs");
const mongoose = require("mongoose");
const AWS = require("aws-sdk");
const Guest = require("./server/guestModel");
require("dotenv").config({
  path: "/Users/inbal/Documents/wedding-website/.env",
});

mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGODB_URL,
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

const SNSClient = new AWS.SNS({ region: "eu-central-1" });

Guest.find({}, async (err, data) => {
  if (err) {
    console.log("failed on getting guests from db, ", err);
  }

  await data.forEach(async (guest) => {
    const [phone, isBadPhone] = validatePhone(guest.phone);
    if (isBadPhone) {
      fs.appendFileSync("smsFailedReport.txt", "bad phone:" + phone);
    } else if (guest.send_sms === "FALSE") {
      console.log("not sending sms for ", phone);
      return;
    } else {
      try {
        console.log("trying to send sms to:", phone);
        const resp = await SNSClient.publish({
          Message: `אנחנו מתרגשים להזמינך לחתונה של ענבל ורואי!🥳\nשתתקיים ביום חמישי ה-29.6.23 ב״איסט״ תל אביב.\nנשמח לאישור הגעה בקישור:\n https://www.inbal-roee.com/?id=${guest._id.toString()}`,
          PhoneNumber: phone,
        })
          .promise()
          .then((resp) => {
            fs.appendFileSync(
              "smsSuccessReport.txt",
              "phone:" +
                phone +
                "," +
                JSON.stringify(resp) +
                "," +
                newDate() +
                "," +
                guest._id.toString() +
                "\n"
            );
            console.log("sms:", resp.ResponseMetadata.RequestId);
          });
      } catch (e) {
        fs.appendFileSync(
          "smsFailedReport.txt",
          "failed:" + phone + "," + e.code + "," + e.time + "," + e
        );
        console.log("failed sending sms, ", e);
      }
    }
  });
});
