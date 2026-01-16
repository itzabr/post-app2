const mongoose = require("mongoose");

console.log("🔥 DB_URL =", process.env.DB_URL);  // <— VERY IMPORTANT

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("✅ DB connected"))
  .catch(err => console.error("❌ DB connection error:", err));
