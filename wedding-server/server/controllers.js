const Guest = require("./guestModel");
const mongoose = require("mongoose");
const validatePhone = require("./utils");
const { SNS } = require("@aws-sdk/client-sns");

const alive = (_, res) => {
  if (mongoose.connection.readyState === 1) {
    return res.json({ status: "I'm alive!" });
  } else {
    res.status(503);
    return res.json({ status: "not alive" });
  }
};

// const getAllGuests = (_, res) => {
//   Guest.find({}, (err, data) => {
//     if (err) {
//       return res.json({ Error: err });
//     }
//     return res.json(data);
//   });
// };

const newGuest = (req, res) => {
  const SNSClient = new SNS({ region: "eu-central-1" });
  console.log("starting create guest:", req.body.name);

  const newGuest = new Guest({
    name: req.body.name,
    phone: req.body.phone,
    expected_guests: req.body.expected_guests,
    actual_guests: req.body.actual_guests,
    coming_status: req.body.coming_status,
    last_mod: new Date(),
  });

  newGuest.save(async (err, data) => {
    if (err) {
      console.log("failed create guest:", req.body.name);
      res.status(500);
      return res.json({ Error: err });
    }

    const [phone, isBadPhone] = validatePhone(req.body.phone);
    if (!isBadPhone) {
      try {
        console.log("trying to send sms to:", phone);
        const resp = await SNSClient.publish({
          Message: `תודה! תגובתך נרשמה🎉 הנה הלינק לעדכון סטטוס ההגעה: https://www.inbal-roee.com/?id=${data._id.toString()}`,
          PhoneNumber: phone,
        });
        console.log("sms:", resp);
      } catch (e) {
        console.log("failed sending sms, ", e);
      }
    }
    console.log("success create guest:", req.body.name);
    return res.json(data);
  });
};

// const deleteAllGuests = (_, res) => {
//   Guest.deleteMany({}, (err) => {
//     if (err) {
//       return res.json({ message: "Complete delete failed" });
//     }
//     return res.json({ message: "Complete delete successful" });
//   });
// };

const getOneGuest = (req, res) => {
  console.log("starting GET guest:", req.params.id);
  Guest.findOne({ _id: req.params.id }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Guest doesn't exist." });
    } else {
      console.log("success GET guest:", req.params.id, data.name);
      return res.json(data);
    }
  });
};

const updateGuest = (req, res) => {
  console.log("starting update guest:", req.params.id);
  Guest.findOne({ _id: req.params.id }, (err, data) => {
    if (err || !data) {
      res.status(500);
      return res.json({ message: "Guest doesn't exist" });
    } else {
      data.actual_guests = req.body.actual_guests;
      data.coming_status = req.body.coming_status;
      data.last_mod = new Date();
      data.save((err) => {
        if (err) {
          console.log("failed update guest:", req.params.id);
          res.status(500);
          return res.json({ message: "Failed to update.", error: err });
        }
        console.log("success update guest:", req.params.id, data.name);
        return res.json(data);
      });
    }
  });
};

// const deleteOneGuest = (req, res) => {
//   Guest.deleteOne({ _id: req.params.id }, (err, data) => {
//     if (data.deletedCount === 0)
//       return res.json({ message: "Guest doesn't exist." });
//     else if (err)
//       return res.json(`Something went wrong, please try again. ${err}`);
//     else return res.json({ message: "Guest deleted." });
//   });
// };

module.exports = {
  alive,
  // getAllGuests,
  newGuest,
  // deleteAllGuests,
  getOneGuest,
  updateGuest,
  // deleteOneGuest,
};
