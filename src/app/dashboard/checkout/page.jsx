
// 'use client';
// import { useState, useEffect } from 'react';
// import {
//   FiUser,
//   FiCalendar,
//   FiClock,
//   FiMapPin,
//   FiLoader,
//   FiCheckCircle,
// } from 'react-icons/fi';
// import { toast } from 'react-toastify';

// export default function CheckOut() {
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     name: '',
//     date: new Date().toISOString().split('T')[0],
//     time: '',
//     location: '',
//   });
//   const [attendanceRecords, setAttendanceRecords] = useState([]);

//   const fetchAttendanceRecords = async () => {
//     try {
//       const res = await fetch('/api/checkout');
//       const data = await res.json();
//       setAttendanceRecords(data);
//     } catch (error) {
//       console.error('Error fetching records:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAttendanceRecords();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) setErrors({ ...errors, [name]: '' });
//   };

//   const handleCheckOut = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);

//     try {
//       const currentTime = new Date().toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//       });
//       const location = await getLocation();

//       const newEntry = {
//         ...formData,
//         time: currentTime,
//         location: location || 'Location not available',
//         status: 'Checked-Out',
//         date: new Date().toLocaleDateString(),
//       };

//       // ✅ 1. POST to backend
//       const res = await fetch('/api/checkout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newEntry),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || 'Check-out failed');
//       }

//       // ✅ 2. Refresh records
//       await fetchAttendanceRecords();

//       // ✅ 3. Reset form
//       setFormData({
//         name: '',
//         date: new Date().toISOString().split('T')[0],
//         time: '',
//         location: '',
//       });

//       toast.success('Checked out successfully!');
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getLocation = () => {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         reject(new Error('Geolocation not supported by your browser'));
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve(
//             `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`
//           );
//         },
//         (error) => {
//           reject(new Error('Location access denied or unavailable'));
//         }
//       );
//     });
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           <div className="bg-[#111827] p-6 text-white text-center">
//             <h2 className="text-2xl font-bold">Employee Check-Out</h2>
//             <p className="text-indigo-100 mt-1">Record your daily check-out</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleCheckOut} className="p-6 space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//               {/* Name */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
//                   <FiUser className="mr-2" /> Employee Name
//                 </label>
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   type="text"
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                     errors.name
//                       ? 'border-red-300 focus:ring-red-200'
//                       : 'border-gray-300 focus:ring-[#a87903]'
//                   }`}
//                   placeholder="Enter your full name"
//                   required
//                 />
//                 {errors.name && (
//                   <p className="mt-1 text-sm text-red-600">{errors.name}</p>
//                 )}
//               </div>

//               {/* Date */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
//                   <FiCalendar className="mr-2" /> Date
//                 </label>
//                 <div className="w-full px-4 py-2 border text-gray-400 rounded-lg bg-gray-50">
//                   {new Date().toLocaleDateString()}
//                 </div>
//               </div>

//               {/* Time */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
//                   <FiClock className="mr-2" /> Time
//                 </label>
//                 <div className="w-full px-4 py-2 border text-gray-400 rounded-lg bg-gray-50">
//                   {new Date().toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                   })}
//                 </div>
//               </div>
//             </div>

//             {/* Location Info */}
//             <div className="bg-blue-50 p-3 rounded-lg flex items-start">
//               <FiMapPin className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
//               <div>
//                 <p className="text-sm font-medium text-blue-800">
//                   Location Tracking
//                 </p>
//                 <p className="text-xs text-blue-600">
//                   Your current location will be automatically recorded
//                 </p>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full md:w-auto md:px-8 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center ${
//                 loading
//                   ? 'bg-indigo-400 cursor-not-allowed'
//                   : ' bg-[#0e0e0e] shadow-md hover:bg-[#1d1d1d]'
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <FiLoader className="animate-spin mr-2" />
//                   Checking Out...
//                 </>
//               ) : (
//                 <>
//                   <FiCheckCircle className="mr-2" />
//                   Check Out
//                 </>
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Records Table */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6">
//           <h2 className="text-xl font-bold mb-4 text-gray-700">
//             Check-Out Records
//           </h2>

//           {attendanceRecords.length === 0 ? (
//             <div className="text-center py-8 text-gray-700">
//               No records found
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Time
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Location
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {attendanceRecords.map((record, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                         {record.name}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500">
//                         {record.date}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500">
//                         {record.time}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
//                           {record.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500">
//                         {record.location}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiLoader,
  FiCheckCircle,
} from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function CheckOutPage() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    location: '',
  });
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const res = await fetch('/api/checkout');
      if (!res.ok) throw new Error('Failed to fetch attendance records');
      const data = await res.json();
      setAttendanceRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      setAttendanceRecords([]);
    }
  };

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

  const handleCheckOut = async (e) => {
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
        status: 'Checked-Out',
        date: new Date().toLocaleDateString(),
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Check-out failed');
      }

      await fetchAttendanceRecords();

      setFormData({
        name: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        location: '',
      });

      toast.success('Checked out successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve(
            `Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`
          );
        },
        () => {
          resolve('Location not available');
        }
      );
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden ">

          <div className="bg-[#111827] p-2 text-white flex justify-between items-center">
          <h2 className="text-1xl font-bold ml-4">Employee Check-Out</h2>
          <p className="text-indigo-100 mt-1 mr-4">Record your daily check-out</p>
        </div>


          {/* Form */}
          <form onSubmit={handleCheckOut} className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiUser className="mr-2" /> Employee Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-[#a87903]'
                  }`}
                  placeholder="Enter your full name"
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiCalendar className="mr-2" /> Date
                </label>
                <div className="w-full px-4 py-2 border text-gray-400 rounded-lg bg-gray-50">
                  {new Date().toLocaleDateString()}
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiClock className="mr-2" /> Time
                </label>
                <div className="w-full px-4 py-2 border text-gray-400 rounded-lg bg-gray-50">
                  {new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-blue-50 p-3 rounded-lg flex items-start">
              <FiMapPin className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Location Tracking
                </p>
                <p className="text-xs text-blue-600">
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
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-[#0e0e0e] shadow-md hover:bg-[#1d1d1d]'
              }`}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Checking Out...
                </>
              ) : (
                <>
                  <FiCheckCircle className="mr-2" />
                  Check Out
                </>
              )}
            </button>
          </form>
        </div>

        {/* Records Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Check-Out Records
          </h2>

          {attendanceRecords.length === 0 ? (
            <div className="text-center py-8 text-gray-700">
              No records found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceRecords.map((record, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{record.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{record.time}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{record.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
