"use client";

import { useEffect, useState } from "react";
import SummaryCard from "./components/SummaryCard";
// import SalesChart from "./components/SalesChart"; // not used for staff dashboard
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiDownload,
  FiUpload,
  FiAlertTriangle,
  FiBox,
  FiRefreshCw,
  FiCheckCircle,
  FiLoader,
  FiClock,
} from "react-icons/fi";
import { useSession } from "next-auth/react";

const invoices = [
  {
    id: "INV001",
    customer: "Skylar Price",
    date: "11/02/2024",
    amount: "$354",
    status: "Delivered",
  },
  {
    id: "INV002",
    customer: "Julian",
    date: "11/09/2024",
    amount: "$910",
    status: "In Progress",
  },
  {
    id: "INV003",
    customer: "Ava Jones",
    date: "08/05/2024",
    amount: "$230",
    status: "Returned",
  },
];

const stockSummary = [
  {
    title: "Total Sales Items",
    value: 210,
    icon: <FiCheckCircle className="text-green-500" />,
  },
  {
    title: "Total Return Items",
    value: 2,
    icon: <FiRefreshCw className="text-yellow-500" />,
  },
  {
    title: "Total Purchases",
    value: 500,
    icon: <FiBox className="text-blue-500" />,
  },
  {
    title: "Purchase Returns",
    value: 10,
    icon: <FiAlertTriangle className="text-red-500" />,
  },
];

const alerts = [
  {
    product: "iPad Pro",
    qty: 5,
    icon: <FiAlertTriangle className="text-red-500" />,
  },
  {
    product: "DJI Mavic Pro 2",
    qty: 3,
    icon: <FiAlertTriangle className="text-red-500" />,
  },
  {
    product: "Google Pixel",
    qty: 8,
    icon: <FiAlertTriangle className="text-yellow-500" />,
  },
];

export default function Dashboard() {
  const [totalExpense, setTotalExpense] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [todayCheckins, setTodayCheckins] = useState(0);
  const [todayCheckouts, setTodayCheckouts] = useState(0);
  const [recentAttendance, setRecentAttendance] = useState([]);
  // loading flags for each section
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingCheckins, setLoadingCheckins] = useState(true);
  const [loadingCheckouts, setLoadingCheckouts] = useState(true);
  const [loadingAttendance, setLoadingAttendance] = useState(true);
  const [loadingExpense, setLoadingExpense] = useState(true);

  const { data: session, status } = useSession();

  // useEffect(() => {
  //   console.log(session,status, "session")
  //   if (status === "unauthenticated") {
  //     // location.replace("/");
  //   }
  // }, [status, session]);

  
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
      icon: <FiCheckCircle className="text-green-500 text-2xl" />,
      color: "bg-green-100",
    },
    {
      title: "Today's Check-Ins",
      value: todayCheckins,
      change: "—",
      isPositive: true,
      icon: <FiClock className="text-yellow-500 text-2xl" />,
      color: "bg-yellow-100",
    },
    {
      title: "Today's Check-Outs",
      value: todayCheckouts,
      change: "—",
      isPositive: true,
      icon: <FiTrendingDown className="text-blue-500 text-2xl" />,
      color: "bg-blue-100",
    },
    {
      title: "Total Expense",
      value: `$${totalExpense.toLocaleString()}`,
      change: "—",
      isPositive: false,
      icon: <FiDollarSign className="text-red-500 text-2xl" />,
      color: "bg-red-100",
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
    <main className="flex-1 p-6 space-y-6 overflow-auto">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, idx) => (
          <SummaryCard key={idx} {...card} />
        ))}
      </div>

      {/* Staff Summary & Recent Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Attendance */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Recent Attendance</h2>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-indigo-600 hover:underline"
            >
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b text-gray-500">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2 text-right">Check-In</th>
                  <th className="pb-2 text-right">Check-Out</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loadingAttendance ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500">
                      <FiLoader className="animate-spin inline-block mr-2" /> Loading attendance...
                    </td>
                  </tr>
                ) : recentAttendance.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500">
                      No recent attendance
                    </td>
                  </tr>
                ) : (
                  recentAttendance.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-3">{row.name}</td>
                      <td>{row.date}</td>
                      <td className="text-right">{row.checkInTime || '-'}</td>
                      <td className="text-right">{row.checkOutTime || '-'}</td>
                      <td className="text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${row.status === 'Checked-Out'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
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
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <h2 className="font-semibold text-lg mb-4">Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              {summaryCards.map((card, idx) => (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 p-3 ${card.color} rounded-lg`}
                >
                  <div className="p-2 bg-white rounded-lg shadow-xs">{card.icon}</div>
                  <div>
                    <p className="text-sm text-gray-500">{card.title}</p>
                    <p className="font-bold text-xl">
                      {isCardLoading(card.title) ? (
                        <FiLoader className="animate-spin text-gray-600" />
                      ) : (
                        card.value
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts (placeholder for HR alerts) */}
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">HR Alerts</h2>
              <button className="text-sm text-indigo-600 hover:underline">Manage</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FiAlertTriangle className="text-yellow-500" />
                  <span className="font-medium">Pending Approvals</span>
                </div>
                <span className="font-bold text-yellow-600">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FiAlertTriangle className="text-red-500" />
                  <span className="font-medium">Low Attendance Records</span>
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
