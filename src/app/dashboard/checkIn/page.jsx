'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { FiUser, FiCalendar, FiClock, FiMapPin, FiLoader, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function CheckInPage() {

  // useSession()

    const { data: session, status } = useSession();


  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: session?.user?.name || "Loading...",
    date: new Date().toISOString().split('T')[0],
    time: '',
    location: '',
  });
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Fetch attendance records from backend
  const fetchAttendanceRecords = async () => {
    try {
      const res = await fetch('/api/checkin');
      if (!res.ok) {
        throw new Error('Failed to fetch attendance records');
      }
      const data = await res.json();
      // Ensure we always set an array, even if the API returns something else
      setAttendanceRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      setAttendanceRecords([]); // Fallback to empty array on error
    }
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleCheckIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      const location = await getLocation();

      const newEntry = {
        ...formData,
        time: currentTime,
        location: location || 'Location not available',
        status: 'Checked-In',
        date: new Date().toLocaleDateString(),
      };

      // ✅ 1. POST data to backend
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Check-in failed');
      }

      // ✅ 2. Refetch updated records
      await fetchAttendanceRecords();

      // ✅ 3. Reset form
      setFormData({
        name: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        location: '',
      });

      toast.success('Checked in successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(
            `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`
          );
        },
        (error) => {
          reject(new Error('Location access denied or unavailable'));
        }
      );
    });
  };

  return (
    <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Check-In Form */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#f7e9ae]/50">
          <div className="bg-[#000000] p-2 sm:p-3 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h2 className="text-lg sm:text-2xl font-bold sm:ml-4" onClick={()=> console.log(session,"session") } >Employee Check-In</h2>
            <p className="text-[#f7e9ae] text-xs sm:text-base sm:mr-4">Record your daily check-in</p>
          </div>

          <form onSubmit={handleCheckIn} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
              {/* Name */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-[#000000] mb-1 flex items-center">
                  <FiUser className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> Employee Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  className={`w-full px-3 sm:px-4 py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-[#f7e9ae]/50 focus:ring-[#c88e3b]'
                  } bg-[#f7e9ae]/20 text-[#000000] placeholder-[#000000]/50`}
                  placeholder="Enter your full name"
                  required
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              {/* Date */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-[#000000] mb-1 flex items-center">
                  <FiCalendar className="mr-2" /> Date
                </label>
                <div className="w-full px-4 py-2 border border-[#f7e9ae]/50 text-[#000000]/70 rounded-lg bg-[#f7e9ae]/20">
                  {new Date().toLocaleDateString()}
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="text-sm font-medium text-[#000000] mb-1 flex items-center">
                  <FiClock className="mr-2" /> Time
                </label>
                <div className="w-full px-4 py-2 border border-[#f7e9ae]/50 text-[#000000]/70 rounded-lg bg-[#f7e9ae]/20">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-[#c88e3b]/20 p-3 rounded-lg flex items-start">
              <FiMapPin className="text-[#000000] mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-[#000000]">Location Tracking</p>
                <p className="text-xs text-[#000000]/70">
                  Your current location will be automatically recorded
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto md:px-8 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center ${
                loading
                  ? 'bg-[#c88e3b]/50 cursor-not-allowed'
                  : ' bg-[#000000] shadow-md hover:bg-[#1a1a1a]'
              }`}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Checking In...
                </>
              ) : (
                <>
                  <FiCheckCircle className="mr-2" />
                  Check In
                </>
              )}
            </button>
          </form>
        </div>


        {/* Records Table */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 border border-[#f7e9ae]/50">
          <h2 className="text-xl font-bold mb-4 text-[#000000]">Attendance Records</h2>
          {attendanceRecords.length === 0 ? (
            <div className="text-center py-8 text-[#000000]/70">No attendance records found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#f7e9ae]/30">
                <thead className="bg-[#c88e3b]/20">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">Location</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-[#f7e9ae]/20">
                  {attendanceRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-[#f7e9ae]/20">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#000000]">{record.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#000000]/70">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#000000]/70">{record.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#c88e3b]/50 text-[#000000]">
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#000000]/70">{record.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
