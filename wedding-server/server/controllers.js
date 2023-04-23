const Guest = require("./guestModel");
const mongoose = require("mongoose");

const alive = (_, res) => {
  if (mongoose.connection.readyState === 1) {
    return res.json({ status: "I'm alive!" });
  } else {
    return res.json({ status: "not alive" });
  }
};

const getAllGuests = (_, res) => {
  Guest.find({}, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    }
    return res.json(data);
  });
};

const newGuest = (req, res) => {
  const AWS = require("aws-sdk");
  const SNSClient = new AWS.SNS({ region: "eu-north-1" });

  const newGuest = new Guest({
    name: req.body.name,
    phone: req.body.phone,
    expected_guests: req.body.expected_guests,
    actual_guests: req.body.actual_guests,
    coming_status: req.body.coming_status,
    last_mod: new Date(),
  });

  newGuest.save(async (err, data) => {
    if (err) return res.json({ Error: err });

    let isBadPhone = false;
    const phoneFromBody = req.body.phone;
    const phone =
      phoneFromBody.charAt(0) === "0"
        ? phoneFromBody.substring(1)
        : phoneFromBody;
    console.log(phone);
    if (phoneFromBody.charAt(0) === "+") {
      console.log("international number"); // need to check if rest are numbers?
    } else if (
      !(phone.length === 9 && /^\d+$/.test(phone) && phone.charAt(0) === "5")
    ) {
      isBadPhone = true;
      console.log("bad phone");
    }

    if (!isBadPhone) {
      try {
        const resp = await SNSClient.publish({
          Message: `תודה! תגובתך נרשמה. הנה הלינק לעדכון סטטוס ההגעה: https://inbal-roee.com/?id=${data._id.toString()}`,
          PhoneNumber: `+972${phone}`,
        }).promise();
        console.log("sms:", resp);
      } catch (e) {
        console.log("failed sending sms, ", e);
      }
    }

    return res.json(data);
  });
};

const deleteAllGuests = (_, res) => {
  Guest.deleteMany({}, (err) => {
    if (err) {
      return res.json({ message: "Complete delete failed" });
    }
    return res.json({ message: "Complete delete successful" });
  });
};

const getOneGuest = (req, res) => {
  Guest.findOne({ _id: req.params.id }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Guest doesn't exist." });
    } else return res.json(data);
  });
};

const updateGuest = (req, res) => {
  Guest.findOne({ _id: req.params.id }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Guest doesn't exist" });
    } else {
      data.actual_guests = req.body.actual_guests;
      data.coming_status = req.body.coming_status;
      data.last_mod = new Date();
      data.save((err) => {
        if (err) {
          return res.json({ message: "Failed to update.", error: err });
        }
        return res.json(data);
      });
    }
  });
};

const deleteOneGuest = (req, res) => {
  Guest.deleteOne({ _id: req.params.id }, (err, data) => {
    if (data.deletedCount === 0)
      return res.json({ message: "Guest doesn't exist." });
    else if (err)
      return res.json(`Something went wrong, please try again. ${err}`);
    else return res.json({ message: "Guest deleted." });
  });
};

module.exports = {
  alive,
  getAllGuests,
  newGuest,
  deleteAllGuests,
  getOneGuest,
  updateGuest,
  deleteOneGuest,
};
