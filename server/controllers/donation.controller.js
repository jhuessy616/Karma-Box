const router = require("express").Router();
const Donation = require("../models/donation.model");
const adminCheck = require("../middleware/adminCheck");
const validateSession = require("../middleware/validate-session");

// ! all donations for one user
router.get("/userDonations", validateSession, async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user._id });
    res.json({ donations: donations, message: "Success" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// get all donations for admin
router.get("/allDonations", adminCheck, async (req, res) => {
  try {
    const donations = await Donation.find().populate("user", "email");
    res.status(200).json({
      donations: donations,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
