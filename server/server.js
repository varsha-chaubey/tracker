require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Progress = require("../server/Progress");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studyTracker";

app.use(cors());
app.use(express.json({ limit: "2mb" })); // tracker state can grow a bit with 30 days of sessions/topics

// GET the saved state for a given key (e.g. "study-tracker-v2")
// Returns { data: null } if nothing saved yet — frontend falls back to its default empty state.
app.get("/api/progress/:key", async (req, res) => {
  try {
    const doc = await Progress.findOne({ key: req.params.key });
    res.json({ data: doc ? doc.data : null });
  } catch (err) {
    console.error("GET /api/progress error:", err.message);
    res.status(500).json({ error: "Failed to load progress" });
  }
});

// Save (upsert) the entire tracker state for a given key.
app.put("/api/progress/:key", async (req, res) => {
  try {
    const { data } = req.body;
    if (data === undefined) {
      return res.status(400).json({ error: "Missing 'data' in request body" });
    }
    const doc = await Progress.findOneAndUpdate(
      { key: req.params.key },
      { key: req.params.key, data },
      { upsert: true, new: true }
    );
    res.json({ data: doc.data });
  } catch (err) {
    console.error("PUT /api/progress error:", err.message);
    res.status(500).json({ error: "Failed to save progress" });
  }
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected:", MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
