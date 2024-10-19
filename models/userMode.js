import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  linkedIn: {
    type: String,
    required: true,
  },
  portFolio: {
    type: String,
    required: true,
  },
  certifications: [
    {
      type: String,
    },
  ],
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  resume: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
