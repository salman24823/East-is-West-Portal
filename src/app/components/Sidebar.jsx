
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
    <aside className="max-lg:hidden relative w-64 bg-gray-900 text-white py-4 space-y-2">
      <div className='sticky top-4'>

        {/* ✅ Logo Display */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo1.png"
            alt="Panze Logo"
            width={80}
            height={80}
            className="rounded-xl"
          />
          <div className="text-2xl font-bold mt-2">
            <span>EAST IS WEST </span>
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
    </aside>
  );
}
