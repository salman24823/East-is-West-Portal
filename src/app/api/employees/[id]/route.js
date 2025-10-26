// import { NextResponse } from 'next/server';
// import dbConnection from '@/config/dbConnection';
// import User from '@/models/userModel';

// export async function GET(_, { params }) {
//   await dbConnection();
//   const user = await User.findById(params.id);
//   if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
//   return NextResponse.json(user);
// }

import { NextResponse } from "next/server";
import dbConnection from "@/config/dbConnection";
import User from "@/models/userModel";

export const revalidate = 0;

// GET /api/employees/:id
export async function GET(_, { params }) {
  console.log(`📥 Received GET request for user ID: ${params.id}`);
  await dbConnection();

  try {
    const user = await User.findById(params.id);

    if (!user) {
      console.warn(`⚠️ User not found with ID: ${params.id}`);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(`❌ GET /api/employees/${params.id} error:`, error.message);
    return NextResponse.json(
      { message: "Server error while fetching user" },
      { status: 500 }
    );
  }
}
