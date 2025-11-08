'use client';

import Link from "next/link";

export default function SummaryCard({ cards }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="backdrop-blur-xl bg-white/10 p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl shadow-2xl border border-[#f7e9ae]/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-medium text-[#000000]/70">
              <Link href={card.link} className="hover:underline">
                {card.title}
              </Link>
            </p>
            <h2 className="text-xl sm:text-2xl font-bold mt-1 text-[#000000] break-words">
              {card.value}
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${card.isPositive ? 'text-black' : 'text-red-600'}`}>
              {card.isPositive ? '↑' : '↓'} {card.change} from last month
            </p>
          </div>
          <div className={`p-2 sm:p-3 rounded-lg shadow-xs flex-shrink-0 ${card.bg}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}