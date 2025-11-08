import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    isTerminate: {
      type: Boolean,
      default: false,
    },
    weeklyPay: { type: Number, default: 0 },
    payPerHour: { type: Number, default: 500 },
    payHistory: [
      {
        amount: Number,
        date: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models?.User || mongoose.model("User", userSchema);