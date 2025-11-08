
'use client';



import Image from 'next/image';
import Link from 'next/link';
import {
  FiHome, FiUsers, FiPackage, FiShoppingCart, FiTruck,
  FiDollarSign, FiCreditCard, FiPieChart, FiShoppingBag,
  FiBarChart2, FiGlobe, FiSettings, FiClock, FiLogOut
} from 'react-icons/fi';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
    { name: 'Check In', icon: FiClock, path: '/dashboard/checkIn' },
    { name: 'Check Out', icon: FiClock, path: '/dashboard/checkout' },
    { name: 'Attendance', icon: FiClock, path: '/dashboard/attendance' },
    // { name: 'Sales', icon: FiShoppingCart, path: '/dashboard/sales' },
    // { name: 'Purchases', icon: FiShoppingBag, path: '/dashboard/purchases' },
    { name: 'Staff Members', icon: FiUsers, path: '/dashboard/employees' },
    { name: 'Expenses', icon: FiPieChart, path: '/dashboard/expenses' },
    // { name: 'Sales Reports', icon: FiBarChart2, path: '/dashboard/reports' },
    // { name: 'Settings', icon: FiSettings, path: '/dashboard/settings' },
    { name: 'Logout', icon: FiLogOut, path: '/' },
  ];

  return (
    <aside className="max-lg:hidden relative w-64 flex flex-col justify-between bg-gray-900 text-white py-4 space-y-2">
      <div className='sticky top-4'>

        {/* ✅ Logo Display */}
        <div className="flex flex-col items-start p-3 mb-6">
          <Image
            src="/logo1.png"
            alt="Panze Logo"
            width={80}
            height={80}
            className="rounded-xl"
          />
          <div className="text-2xl font-bold mt-2">
            <span>EAST IS WEST HOTEL</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-1">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className={`flex items-center space-x-3 px-4 py-3 transition-all hover:bg-gray-800 ${item.name === 'Dashboard' ? 'bg-gray-900' : ''}`}
            >
              <item.icon className="text-lg text-gray-300" />
              <span className="text-gray-200">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 w-full">
        <Link
          href="#"
          className="block w-full p-3 rounded-lg border border-[#f7e9ae]/30 bg-white/5 hover:bg-white/10 transition shadow-sm hover:shadow-md"
          aria-label="East is West Coffee"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#c88e3b]/20 flex items-center justify-center text-[#000000] font-bold">
              C
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-semibold text-[#f7e9ae] leading-tight truncate">East is West Coffee</div>
              <div className="text-xs text-white/70 truncate">Open 8am - 8pm</div>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
