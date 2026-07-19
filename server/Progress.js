const mongoose = require("mongoose");

// Simple single-document-per-key store.
// We keep the whole tracker state (all 30 days, sessions, topics) as one JSON blob
// under a fixed key, exactly like the old window.storage approach — just backed by Mongo now.
const progressSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
