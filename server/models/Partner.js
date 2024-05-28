const mongoose = require("mongoose");

const Partner = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter your Name"] },
  organization: {
    type: String,
    required: [true, "Please enter your Organization name"],
  },
  role: {
    type: String,
    required: [true, "Please enter your Role"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please add your Phone Number"],
  },
  isExistingSubscriber: {
    type: Boolean,
    default: false,
    required: [true, "Please indicate if you're an existing subscriber"],
  },
  isCurrentlyOnProject: {
    type: Boolean,
    default: false,
    required: [true, "Please indicate if you're currently on a project"],
  },
  monthlyConsumption: {
    type: Number,
    required: [true, "Please add your Monthly Consumption"],
  },
  earliestAvailability: {
    type: Date,
    required: [true, "Please add you Earliest Availability"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Partner", Partner);
