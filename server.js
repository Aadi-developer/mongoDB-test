const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend"))); // serve frontend folder

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/MongoDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> console.log("✅ MongoDB Connected"))
  .catch(err=> console.log("❌ MongoDB connection error:", err));

// Schema + Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Contact = mongoose.model("Contact", contactSchema);

// POST route
app.post("/submit", async (req, res)=>{
  const { name, email, message } = req.body;
  if(!name || !email || !message) return res.json({ status: "error" });

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("Form saved:", { name, email, message });
    res.json({ status: "success" });
  } catch(err){
    console.error(err);
    res.json({ status: "error" });
  }
});

// Start server
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));

