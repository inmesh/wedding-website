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

    const jsonData = res.json(data);
    try {
      const resp = await SNSClient.publish({
        Message: `Thanks for RSVPing! here's the link for updating your status: https://main.d2h38jsnoornds.amplifyapp.com/?id=${jsonData["_id"]}`,
        PhoneNumber: `+972${req.body.phone}`,
      }).promise();
      console.log("sms:", resp);
    } catch (e) {
      console.log("failed sending sms, ", e);
    }

    return jsonData;
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
    console.log(req.params.id);
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
