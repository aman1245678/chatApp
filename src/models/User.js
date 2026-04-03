// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    online: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);