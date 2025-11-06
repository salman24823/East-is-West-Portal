'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AttendancePage() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('today');

  const payPerHour = 500; // Set your pay per hour here

  useEffect(() => {
    fetchMergedAttendance();
  }, []);

  const fetchMergedAttendance = async () => {
    try {
      const res = await fetch('/api/attendance');
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      toast.error('Failed to fetch attendance');
    }
  };

  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  const filteredRecords = records.filter((rec) => {
    const date = new Date(rec.date).toDateString();
    if (filter === 'today') return date === today;
    if (filter === 'yesterday') return date === yesterday;
    return true;
  });

const calculateTotalHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut || checkIn === '-' || checkOut === '-') return '-';

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  try {
    const minutesIn = parseTime(checkIn);
    const minutesOut = parseTime(checkOut);

    const diffMinutes = minutesOut - minutesIn;
    if (diffMinutes <= 0) return '-';

    const hours = (diffMinutes / 60).toFixed(2);
    return hours;
  } catch (err) {
    return '-';
  }
};


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f7e9ae] via-[#f0d98f] to-[#c88e3b] p-6 relative overflow-hidden">
      {/* Animated Background with Mouse Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-[#c88e3b]/20 rounded-full blur-3xl"
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#f7e9ae]/25 rounded-full blur-3xl"
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#c88e3b]/15 rounded-full blur-2xl"
        ></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        <h1 className="text-center text-2xl font-bold text-[#000000]">Employee Attendance</h1>

        {/* Filters */}
        <div className="flex justify-center gap-3">
          {['today', 'yesterday'].map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filter === key ? 'bg-[#c88e3b] text-white' : 'bg-[#f7e9ae]/50 text-[#000000]'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Attendance Table */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 shadow-2xl border border-[#f7e9ae]/50 overflow-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#c88e3b]/20">
              <tr>
                <th className="px-4 py-2 text-[#000000] font-semibold">Name</th>
                <th className="px-4 py-2 text-[#000000] font-semibold">Date</th>
                <th className="px-4 py-2 text-[#000000] font-semibold">Check-In</th>
                <th className="px-4 py-2 text-[#000000] font-semibold">Check-Out</th>
                <th className="px-4 py-2 text-[#000000] font-semibold">Total Hours</th>
                <th className="px-4 py-2 text-[#000000] font-semibold">Status</th>
                <th className="px-4 py-2 text-[#000000] font-semibold">Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-[#000000]/70">
                    No records found
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec, i) => (
                  <tr key={i} className="border-t border-[#f7e9ae]/30">
                    <td className="px-4 py-2 text-[#000000]">{rec.name}</td>
                    <td className="px-4 py-2 text-[#000000]">{rec.date}</td>
                    <td className="px-4 py-2 text-[#000000]">{rec.checkInTime || '-'}</td>
                    <td className="px-4 py-2 text-[#000000]">{rec.checkOutTime || '-'}</td>
                    <td className="px-4 py-2 text-[#000000]">
                      {calculateTotalHours(rec.checkInTime, rec.checkOutTime)}
                    </td>
                    <td className="px-4 py-2 text-[#000000]">{rec.status}</td>
                    <td className="px-4 py-2 text-[#000000]">{rec.location}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
