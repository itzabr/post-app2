const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // receiver
  from: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // who did action
  type: String,   // "like"
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  message: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("notification", notificationSchema);
