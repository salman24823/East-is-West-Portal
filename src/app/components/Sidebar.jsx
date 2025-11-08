
'use client';

import { useState } from 'react';
import { Globe2, GlobeIcon, Link2, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiHome, FiUsers, FiPackage, FiShoppingCart, FiTruck,
  FiDollarSign, FiCreditCard, FiPieChart, FiShoppingBag,
  FiBarChart2, FiGlobe, FiSettings, FiClock, FiLogOut
} from 'react-icons/fi';

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
    { name: 'Website', icon: Link2, path: '#' },
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
    <>
      {/* Desktop Sidebar */}
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
            href="https://east-is-west-coffee.vercel.app/dashboard"
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

      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-lg">
        {/* Mobile Logo/Title */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo1.png"
            alt="Panze Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="text-lg font-bold">EAST IS WEST</span>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Sliding Menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu Drawer */}
          <aside className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-gray-900 text-white overflow-y-auto lg:hidden animate-slide-in">
            <div className="flex flex-col justify-between h-full p-4">
              <div>
                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {navItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-all active:bg-gray-700"
                    >
                      <item.icon className="text-lg text-gray-300" />
                      <span className="text-gray-200">{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Mobile Coffee Link */}
              <div className="pt-4 border-t border-gray-700 mt-4">
                <Link
                  href="https://east-is-west-coffee.vercel.app/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full p-3 rounded-lg border border-[#f7e9ae]/30 bg-white/5 hover:bg-white/10 transition shadow-sm"
                  aria-label="East is West Coffee"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#c88e3b]/20 flex items-center justify-center text-[#000000] font-bold text-sm">
                      C
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-sm font-semibold text-[#f7e9ae] leading-tight truncate">East is West Coffee</div>
                      <div className="text-xs text-white/70 truncate">Open 8am - 8pm</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <style jsx>{`
              @keyframes slideIn {
                from {
                  transform: translateX(-100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
              .animate-slide-in {
                animation: slideIn 0.3s ease-in-out;
              }
            `}</style>
          </aside>
        </>
      )}
    </>
  );
}
