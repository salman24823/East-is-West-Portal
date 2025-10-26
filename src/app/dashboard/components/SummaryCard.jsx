'use client';

import Link from "next/link";

export default function SummaryCard({ title, value, change, isPositive, icon, color }) {
  return (
    <div className={`p-5 rounded-xl shadow-sm border ${color} flex items-center justify-between`}>
      <div>
        <p className="text-sm font-medium text-gray-600">

          <Link href={title === "Total Expense" ? "/dashboard/expenses" : title === "Total Employees" ? "/dashboard/employees" : "/dashboard/attendance"} className="hover:underline">
            {title}
          </Link>


        </p>
        <h2 className="text-2xl font-bold mt-1">
          {value}
        </h2>
        <p className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {change} from last month
        </p>
      </div>
      <div className="p-3 bg-white rounded-lg shadow-xs">
        {icon}
      </div>
    </div>
  );
}