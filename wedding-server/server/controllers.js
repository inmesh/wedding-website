const Guest = require("./guestModel");

const getAllGuests = (_, res) => {
  Guest.find({}, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    }
    return res.json(data);
  });
};

const newGuest = (req, res) => {
  Guest.findOne({ _id: req.body.id }, (err, data) => {
    if (!data) {
      const newGuest = new Guest({
        name: req.body.name,
        phone: req.body.phone,
        expected_guests: req.body.expected_guests,
        actual_guests: req.body.actual_guests,
        coming_status: req.body.coming_status,
        last_mod: new Date(),
      });

      newGuest.save((err, data) => {
        if (err) return res.json({ Error: err });
        return res.json(data);
      });
    } else {
      if (err)
        return res.json(`Something went wrong, please try again. ${err}`);
      return res.json({ message: "Guest phone already exists" });
    }
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
  getAllGuests,
  newGuest,
  deleteAllGuests,
  getOneGuest,
  updateGuest,
  deleteOneGuest,
};
