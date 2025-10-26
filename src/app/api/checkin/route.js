import { NextResponse } from "next/server";
import dbConnection from "@/config/dbConnection";
import Checkin from "@/models/checkinModel";

export const revalidate = 0;

export async function GET(req) {
  await dbConnection();

  try {

    const checkins = await Checkin.find().sort({ createdAt: -1 });
    console.log(checkins,"checkins")
    return NextResponse.json(checkins, { status: 200 });

 

  } catch (error) {
    console.error("GET /api/checkin error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnection();

  try {
    // if (!process.env.NEXTAUTH_SECRET) {
    //   return NextResponse.json(
    //     { message: "Server configuration error: NEXTAUTH_SECRET not set" },
    //     { status: 500 }
    //   );
    // }
    
    // const token = await getToken({ req, secret });

    // if (!token) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

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
      // userEmail: token.email,
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
