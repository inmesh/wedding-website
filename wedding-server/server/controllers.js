const Guest = require("./guestModel");
const mongoose = require("mongoose");
const validatePhone = require("./utils");
const { SNS } = require("@aws-sdk/client-sns");
const _ = require("lodash");  

let newGuestCounter = 0;

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

    if (newGuestCounter === 70 || newGuestCounter === 90) {
      try {
        const respInbal = await SNSClient.publish({ Message: `newGuest counter is at ${newGuestCounter}`, PhoneNumber: "+972547680150" });
        const respRoee = await SNSClient.publish({ Message: `newGuest counter is at ${newGuestCounter}`, PhoneNumber: "+972544664658" });
        console.log("counter sms:", respInbal, respRoee);
      } catch (e) {
        console.log("failed sending counter sms, ", e);
      }
    }

    if (newGuestCounter >= 100) {
      console.log("block create guest:", req.body.name, ", counter is 100");
      res.status(500);
      return res.json({ Error: "counter is 100" });
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
    newGuestCounter += 1;
    console.log("success create guest:", req.body.name);
    console.log("new guest counter value:", newGuestCounter);
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
      return res.json(_.pick(data, '_id', 'coming_status', 'actual_guests', 'name', 'expected_guests'));
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
        console.log("success update guest:", req.params.id, data.name, req.body.coming_status, req.body.actual_guests);
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
