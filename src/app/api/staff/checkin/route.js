import { NextResponse } from "next/server";
import dbConnection from "@/config/dbConnection";
import Checkin from "@/models/checkinModel";
import { getToken } from "next-auth/jwt"; // Adjust this if you're using another auth method

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

    const checkins =
      role === "admin"
        ? await Checkin.find().sort({ createdAt: -1 })
        : await Checkin.find({ userEmail: email }).sort({ createdAt: -1 });

    return NextResponse.json(checkins);
  } catch (error) {
    console.error("GET /api/checkin error:", error);
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

    const newCheckin = await Checkin.create({
      name,
      date,
      time,
      location,
      status,
      userEmail: token.email,
    });

    return NextResponse.json(
      { message: "Check-in successful", checkin: newCheckin },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/checkin error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
