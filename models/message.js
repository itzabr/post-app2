const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  to:   { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  text: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("message", messageSchema);
