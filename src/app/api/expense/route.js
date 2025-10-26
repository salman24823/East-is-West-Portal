// // src/app/api/expense/route.js
// import { NextResponse } from 'next/server';
// import dbConnection from '@/config/dbConnection';
// import Expense from '@/models/expenses';

// // GET /api/expense
// export async function GET() {
//   await dbConnection();
//   try {
//     const expenses = await Expense.find().sort({ createdAt: -1 });
//     const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
//     return NextResponse.json({ expenses, total });
//   } catch (error) {
//     return NextResponse.json({ message: 'Failed to fetch expenses.' }, { status: 500 });
//   }
// }

// // POST /api/expense
// export async function POST(request) {
//   await dbConnection();
//   try {
//     const body = await request.json();
//     const newExpense = new Expense(body);
//     await newExpense.save();
//     return NextResponse.json({ expense: newExpense, message: 'Expense created successfully.' }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Failed to create expense.' }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import dbConnection from "@/config/dbConnection";
import Expense from "@/models/expenses";

export const revalidate = 0;

// GET /api/expense → fetch all expenses & total
export async function GET() {
  console.log("📥 Received GET request to fetch expenses");

  await dbConnection();

  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });

    const total = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

    console.log(`✅ Fetched ${expenses.length} expenses. Total: ${total}`);

    return NextResponse.json({ expenses, total }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching expenses:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch expenses." },
      { status: 500 }
    );
  }
}

// POST /api/expense → create a new expense
export async function POST(request) {
  console.log("📥 Received POST request to create a new expense");

  await dbConnection();

  try {
    const body = await request.json();
    const { title, amount, category, date } = body;

    // Basic validation
    if (!title || !amount || isNaN(amount)) {
      return NextResponse.json(
        { message: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const newExpense = new Expense({
      title,
      amount,
      category,
      date: date || new Date().toISOString(),
    });

    await newExpense.save();

    console.log("✅ Expense saved:", newExpense);

    return NextResponse.json(
      { expense: newExpense, message: "Expense created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating expense:", error.message);
    return NextResponse.json(
      { message: "Failed to create expense." },
      { status: 500 }
    );
  }
}
