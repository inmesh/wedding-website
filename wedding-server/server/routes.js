const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const guestController = require("./controllers");

router.get("/guest", guestController.getAllGuests);
// router.post("/guest", guestController.newGuest);
router.post("/guest", upload.none(), guestController.newGuest);
router.delete("/guest", guestController.deleteAllGuests);

router.get("/guest/:phone", guestController.getOneGuest);
router.post("/guest/:phone", guestController.updateGuest);
router.delete("/guest/:phone", guestController.deleteOneGuest);

module.exports = router;
