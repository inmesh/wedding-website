const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const guestController = require("./controllers");

router.get("/guest", guestController.getAllGuests);
// router.post("/guest", guestController.newGuest);
router.post("/guest", upload.none(), guestController.newGuest);
router.delete("/guest", guestController.deleteAllGuests);

router.get("/guest/:id", guestController.getOneGuest);
router.post("/guest/:id", guestController.updateGuest);
router.delete("/guest/:id", guestController.deleteOneGuest);

module.exports = router;
