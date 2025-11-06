'use client';

import Link from "next/link";

export default function SummaryCard({ title, value, change, isPositive, icon, color }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 p-5 rounded-3xl shadow-2xl border border-[#f7e9ae]/50 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#000000]/70">

          <Link href={title === "Total Expense" ? "/dashboard/expenses" : title === "Total Employees" ? "/dashboard/employees" : "/dashboard/attendance"} className="hover:underline">
            {title}
          </Link>


        </p>
        <h2 className="text-2xl font-bold mt-1 text-[#000000]">
          {value}
        </h2>
        <p className={`text-sm mt-1 ${isPositive ? 'text-[#c88e3b]' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {change} from last month
        </p>
      </div>
      <div className="p-3 bg-[#f7e9ae]/50 rounded-lg shadow-xs">
        {icon}
      </div>
    </div>
  );
}