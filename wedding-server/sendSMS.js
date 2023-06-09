const validatePhone = require("./server/utils");
const fs = require("fs");
const mongoose = require("mongoose");
const { SNS } = require("@aws-sdk/client-sns");
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

const SNSClient = new SNS({ region: "eu-central-1" });

Guest.find({}, async (err, data) => {
  if (err) {
    console.log("failed on getting guests from db, ", err);
  }

  await data.forEach(async (guest) => {
    const [phone, isBadPhone] = validatePhone(guest.phone);
    if (guest.send_sms === "FALSE" || guest.coming_status !== "") {
      console.log("not sending sms to ", phone);
    } else if (isBadPhone) {
      fs.appendFileSync("smsFailedReport.txt", "bad phone:" + phone + "\n");
      return;
    } else {
      try {
        console.log("trying to send sms to:", phone);
        const resp = await SNSClient.publish({
          Message: `אנחנו מתרגשים להזמינך לחתונה של ענבל ורואי!🥳\nשתתקיים ביום חמישי ה-29.6.23 ב״איסט״ תל אביב.\nנשמח לאישור הגעה בקישור:\n https://www.inbal-roee.com/?id=${guest._id.toString()}`,
          PhoneNumber: phone,
        }).then((resp) => {
          fs.appendFileSync(
            "smsSuccessReport.txt",
            [phone, JSON.stringify(resp), new Date(), guest._id.toString(), "\n"].join(",")
          );
          console.log("sms:", resp);
        });
      } catch (e) {
        fs.appendFileSync(
          "smsFailedReport.txt",
          ["failed:", phone, e.code, e.time, e, guest._id.toString(), "\n"].join(",")
        );
        console.log("failed sending sms, ", e);
      }
    }
  });
});
