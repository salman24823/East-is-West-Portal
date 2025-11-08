'use client';

import Link from "next/link";

export default function SummaryCard({ cards }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="backdrop-blur-xl bg-white/10 p-5 rounded-3xl shadow-2xl border border-[#f7e9ae]/50 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#000000]/70">
              <Link href={card.link} className="hover:underline">
                {card.title}
              </Link>
            </p>
            <h2 className="text-2xl font-bold mt-1 text-[#000000]">
              {card.value}
            </h2>
            <p className={`text-sm mt-1 ${card.isPositive ? 'text-black' : 'text-red-600'}`}>
              {card.isPositive ? '↑' : '↓'} {card.change} from last month
            </p>
          </div>
          <div className={`p-3 rounded-lg shadow-xs ${card.bg}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}