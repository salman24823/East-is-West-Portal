"use client";

import { useEffect, useState } from "react";
import SummaryCard from "./components/SummaryCard";
// import SalesChart from "./components/SalesChart"; // not used for staff dashboard
import {
  FiTrendingDown,
  // FiPound,
  FiAlertTriangle,
  FiCheckCircle,
  FiLoader,
  FiClock,
} from "react-icons/fi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PoundSterling } from "lucide-react";

export default function Dashboard() {
  const [totalExpense, setTotalExpense] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [todayCheckins, setTodayCheckins] = useState(0);
  const [todayCheckouts, setTodayCheckouts] = useState(0);
  const [recentAttendance, setRecentAttendance] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingCheckins, setLoadingCheckins] = useState(true);
  const [loadingCheckouts, setLoadingCheckouts] = useState(true);
  const [loadingAttendance, setLoadingAttendance] = useState(true);
  const [loadingExpense, setLoadingExpense] = useState(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [empRes, checkinRes, checkoutRes, attendanceRes, expenseRes] =
          await Promise.all([
            fetch("/api/employees"),
            fetch("/api/checkin"),
            fetch("/api/checkout"),
            fetch("/api/attendance"),
            fetch("/api/expense"),
          ]);

        const todayStr = new Date().toLocaleDateString();

        // employees
        let employees = [];
        if (empRes.ok) employees = await empRes.json();
        setActiveEmployees(Array.isArray(employees) ? employees.length : 0);
        setLoadingEmployees(false);

        // checkins
        let checkins = [];
        if (checkinRes.ok) checkins = await checkinRes.json();
        const todaysCheckins = Array.isArray(checkins)
          ? checkins.filter((c) => c.date === todayStr).length
          : 0;
        setTodayCheckins(todaysCheckins);
        setLoadingCheckins(false);

        // checkouts
        let checkouts = [];
        if (checkoutRes.ok) checkouts = await checkoutRes.json();
        const todaysCheckouts = Array.isArray(checkouts)
          ? checkouts.filter((c) => c.date === todayStr).length
          : 0;
        setTodayCheckouts(todaysCheckouts);
        setLoadingCheckouts(false);

        // attendance (merged)
        if (attendanceRes.ok) {
          const attendance = await attendanceRes.json();
          setRecentAttendance(Array.isArray(attendance) ? attendance.slice(0, 8) : []);
        } else {
          setRecentAttendance([]);
        }
        setLoadingAttendance(false);

        // expense total
        if (expenseRes.ok) {
          const expenseData = await expenseRes.json();
          setTotalExpense(expenseData?.total || 0);
        } else {
          setTotalExpense(0);
        }
        setLoadingExpense(false);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
        // clear loading flags on error to avoid perpetual spinners
        setLoadingEmployees(false);
        setLoadingCheckins(false);
        setLoadingCheckouts(false);
        setLoadingAttendance(false);
        setLoadingExpense(false);
      }
    };

    fetchDashboardData();
  }, []);

  const summaryCards = [
    {
      title: "Active Employees",
      value: activeEmployees,
      change: "—",
      isPositive: true,
      icon: <FiCheckCircle className="text-[#c88e3b] text-2xl" />,
      // bg: "bg-[#c88e3b]/20",
      link: "/dashboard/employees"
    },
    {
      title: "Today's Check-Ins",
      value: todayCheckins,
      change: "—",
      isPositive: true,
      icon: <FiClock className="text-[#c88e3b] text-2xl" />,
      // bg: "bg-[#c88e3b]/20",
      link: "/dashboard/attendance"
    },
    {
      title: "Today's Check-Outs",
      value: todayCheckouts,
      change: "—",
      isPositive: true,
      icon: <FiTrendingDown className="text-[#c88e3b] text-2xl" />,
      // bg: "bg-[#c88e3b]/20",
      link: "/dashboard/attendance"
    },
    {
      title: "Total Expense",
      value: loadingExpense ? "..." : `£${totalExpense.toLocaleString()}`,
      change: "—",
      isPositive: false,
      icon: <PoundSterling className="text-[#000000] text-2xl" />,
      // bg: "bg-[#000000]/10",
      link: "/dashboard/expenses"
    },
  ];

  const isCardLoading = (title) => {
    if (title === "Active Employees") return loadingEmployees;
    if (title === "Today's Check-Ins") return loadingCheckins;
    if (title === "Today's Check-Outs") return loadingCheckouts;
    if (title === "Total Expense") return loadingExpense;
    return false;
  };

  return (
    <main className="flex-1 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 overflow-auto">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#000000]">Dashboard Overview</h1>

      {/* Summary Cards */}
      <SummaryCard cards={summaryCards} />

      {/* Staff Summary & Recent Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Attendance */}
        <div className="backdrop-blur-xl bg-white/10 p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl border border-[#f7e9ae]/50 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
            <h2 className="font-semibold text-base sm:text-lg text-[#000000]">
              <Link href="/dashboard/attendance" className="hover:underline text-sm sm:text-base">
                Recent Attendance
              </Link>

            </h2>
            <button
              onClick={() => window.location.reload()}
              className="text-xs sm:text-sm text-[#c88e3b] hover:underline"
            >
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="text-left border-b border-[#f7e9ae]/30 text-[#000000]/70">
                  <th className="pb-2 px-1 sm:px-2">Name</th>
                  <th className="pb-2 px-1 sm:px-2">Date</th>
                  <th className="pb-2 px-1 sm:px-2 text-right">Check-In</th>
                  <th className="pb-2 px-1 sm:px-2 text-right">Check-Out</th>
                  <th className="pb-2 px-1 sm:px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f7e9ae]/20">
                {loadingAttendance ? (
                  <tr>
                    <td colSpan={5} className="py-4 sm:py-6 text-center text-[#000000]/70 text-xs sm:text-sm">
                      <FiLoader className="animate-spin inline-block mr-2" /> Loading attendance...
                    </td>
                  </tr>
                ) : recentAttendance.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 sm:py-6 text-center text-[#000000]/70 text-xs sm:text-sm">
                      No recent attendance
                    </td>
                  </tr>
                ) : (
                  recentAttendance.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#f7e9ae]/20">
                      <td className="py-2 sm:py-3 px-1 sm:px-2 text-[#000000] text-xs sm:text-sm truncate">{row.name}</td>
                      <td className="py-2 sm:py-3 px-1 sm:px-2 text-[#000000] text-xs sm:text-sm">{row.date}</td>
                      <td className="py-2 sm:py-3 px-1 sm:px-2 text-right text-[#000000] text-xs sm:text-sm">{row.checkInTime || '-'}</td>
                      <td className="py-2 sm:py-3 px-1 sm:px-2 text-right text-[#000000] text-xs sm:text-sm">{row.checkOutTime || '-'}</td>
                      <td className="py-2 sm:py-3 px-1 sm:px-2 text-right">
                        <span
                          className={`inline-flex items-center px-2 sm:px-2.5 py-1 sm:py-0.5 rounded-full text-xs font-medium
                        ${row.status === 'Checked-Out'
                              ? 'bg-[#f7e9ae]/50 text-[#000000]'
                              : 'bg-[#c88e3b]/50 text-[#000000]'
                            }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff Summary Cards */}
        <div className="space-y-4 sm:space-y-6">
          <div className="backdrop-blur-xl bg-white/10 p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl border border-[#f7e9ae]/50">
            <h2 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-[#000000]">

              Analytics Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-[#f7e9ae]/50 rounded-lg">
                <div className="p-1.5 sm:p-2 rounded-lg shadow-xs flex-shrink-0">
                  <FiAlertTriangle className="text-[#c88e3b] w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-[#000000]/70">Pending Approvals</p>
                  <p className="font-bold text-lg sm:text-xl text-[#000000]">3</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-[#f7e9ae]/50 rounded-lg">
                <div className="p-1.5 sm:p-2 rounded-lg shadow-xs flex-shrink-0">
                  <FiAlertTriangle className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-[#000000]/70">Low Attendance</p>
                  <p className="font-bold text-lg sm:text-xl text-[#000000]">2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts (placeholder for HR alerts) */}
          <div className="backdrop-blur-xl bg-white/10 p-5 rounded-3xl shadow-2xl border border-[#f7e9ae]/50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg text-[#000000]">HR Alerts</h2>
              <Link href={"/dashboard/employees"} className="text-sm text-[#c88e3b] hover:underline">
                Manage
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#f7e9ae]/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FiAlertTriangle className="text-[#c88e3b]" />
                  <span className="font-medium text-[#000000]">Pending Approvals</span>
                </div>
                <span className="font-bold text-[#c88e3b]">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FiAlertTriangle className="text-red-500" />
                  <span className="font-medium text-[#000000]">Low Attendance Records</span>
                </div>
                <span className="font-bold text-red-600">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

