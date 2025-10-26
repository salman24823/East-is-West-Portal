import { NextResponse } from "next/server";
import dbConnection from "@/config/dbConnection";
import Checkout from "@/models/checkoutModel";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
export const revalidate = 0;

export async function GET(req) {
  await dbConnection();

  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { email, role } = token;

    const checkouts =
      role === "admin"
        ? await Checkout.find().sort({ createdAt: -1 })
        : await Checkout.find({ userEmail: email }).sort({ createdAt: -1 });

    return NextResponse.json(checkouts);
  } catch (error) {
    console.error("GET /api/checkout error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnection();

  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, date, time, location, status } = await req.json();

    if (!name || !date || !time || !location) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newCheckout = await Checkout.create({
      name,
      date,
      time,
      location,
      status,
      userEmail: token.email,
    });

    return NextResponse.json(
      { message: "Check-out successful", checkout: newCheckout },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/checkout error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
