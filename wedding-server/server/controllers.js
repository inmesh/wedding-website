const Guest = require("./guestModel");

const getAllGuests = (req, res) => {
  Guest.find({}, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    }
    return res.json(data);
  });
};

const newGuest = (req, res) => {
  Guest.findOne({ phone: req.body.phone }, (err, data) => {
    if (!data) {
      const newGuest = new Guest({
        name: req.body.name,
        phone: req.body.phone,
        expected_guests: req.body.expected_guests,
        actual_guests: req.body.actual_guests,
        coming_status: req.body.coming_status,
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

const deleteAllGuests = (req, res) => {
  Guest.deleteMany({}, (err) => {
    if (err) {
      return res.json({ message: "Complete delete failed" });
    }
    return res.json({ message: "Complete delete successful" });
  });
};

const getOneGuest = (req, res) => {
  Guest.findOne({ phone: req.params.phone }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Guest doesn't exist." });
    } else return res.json(data);
  });
};

const updateGuest = (req, res) => {
  Guest.findOne({ phone: req.params.phone }, (err, data) => {
    if (err || !data) {
      newGuest(req, res);
      return res.json({ message: "Guest doesn't exist, created new one." });
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
  Guest.deleteOne({ phone: req.params.phone }, (err, data) => {
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
