

// import { NextResponse } from "next/server";
// import connectDB from "@/config/dbConnection"; // ✅ Import your MongoDB connection function
// import User from "@/models/userModel";

// export async function PATCH(req, { params }) {
//   await connectDB(); // ✅ Ensure DB is connected

//   try {
//     const { newPay } = await req.json();

//     const user = await User.findById(params.id);

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     user.payHistory = user.payHistory || [];

//     user.payHistory.push({
//       amount: newPay,
//       date: new Date().toISOString(),
//     });

//     await user.save();

//     return NextResponse.json({
//       message: "Pay updated",
//       payHistory: user.payHistory,
//     });
//   } catch (error) {
//     console.error("PATCH /api/employees/:id/pay error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/config/dbConnection";
import User from "@/models/userModel";

// PATCH /api/employees/:id/pay
export async function PATCH(req, { params }) {
  console.log(
    `🔁 Received PATCH request to update pay for user ID: ${params.id}`
  );
  await connectDB();

  try {
    const { newPay } = await req.json();

    // Validate payload
    if (!newPay) {
      return NextResponse.json(
        { message: "Missing newPay amount" },
        { status: 400 }
      );
    }

    // Fetch user by ID
    const user = await User.findById(params.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Initialize payHistory if undefined
    user.payHistory = user.payHistory || [];

    // Append new payment entry
    user.payHistory.push({
      amount: newPay,
      date: new Date().toISOString(),
    });

    // Also update the user's current payPerHour so each employee can have their own rate
    user.payPerHour = newPay;

    await user.save();

    console.log("✅ Pay updated for user:", params.id);

    return NextResponse.json(
      {
        message: "Pay updated successfully",
        payHistory: user.payHistory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ PATCH /api/employees/:id/pay error:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
