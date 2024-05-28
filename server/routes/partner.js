const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
  getPartners,
  createPartner,
  getPartner,
} = require("../controller/partner");

router.route("/").get(protect, getPartners).post(createPartner);
router.route("/:id").get(protect, getPartner);

module.exports = router;
