
// import dbConnection from '@/config/dbConnection';
// import User from '@/models/userModel';
// import { NextResponse } from 'next/server';

// export async function GET(req) {
//   try {
//     await dbConnection();
//     const employees = await User.find({ isTerminate: false });
//     return NextResponse.json(employees);
//   } catch (error) {
//     return NextResponse.json({ error: "Error fetching employees" }, { status: 500 });
//   }
// }

import dbConnection from "@/config/dbConnection";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
export const revalidate = 0;

// GET /api/employees
export async function GET(req) {
  console.log("📥 Received GET request to fetch active employees");

  try {
    await dbConnection();

    const employees = await User.find({ isTerminate: false });

    console.log(`✅ Fetched ${employees.length} active employees`);

    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching employees:", error.message);
    return NextResponse.json(
      { error: "Error fetching employees" },
      { status: 500 }
    );
  }
}

