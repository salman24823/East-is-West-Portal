// import { NextResponse } from "next/server";
// import dbConnection from "@/config/dbConnection";
// import User from "@/models/userModel";

// export async function GET(req, { params }) {
//   await dbConnection();
//   const user = await User.findOne({ email: params.email });

//   if (!user) {
//     return NextResponse.json({ message: "User not found" }, { status: 404 });
//   }

//   return NextResponse.json({
//     name: user.name,
//     email: user.email,
//     attendance: user.attendance || [],
//     payHistory: user.payHistory || [],
//   });
// }

import { NextResponse } from "next/server";
import dbConnection from "@/config/dbConnection";
import User from "@/models/userModel";

export const revalidate = 0;

// GET /api/user/[email]
export async function GET(req, { params }) {

  try {
    console.log(`[GET] /api/user/${params.email}`);

    await dbConnection();

    const user = await User.findOne({ email: params.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        name: user.name,
        email: user.email,
        attendance: user.attendance || [],
        payHistory: user.payHistory || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
