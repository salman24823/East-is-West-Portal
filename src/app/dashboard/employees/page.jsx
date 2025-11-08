'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowDownLeft, ArrowRight, CornerDownRight } from 'lucide-react';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [defaultPay, setDefaultPay] = useState(500);

  // inline edit state
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect( ()=> {
    async function fetchEmployees() {
      try{
        const res = await fetch('/api/employees');
        const data = await res.json();

        setEmployees(data || []);
      }catch(error){
        console.error("Failed to fetch employees:", error);
        setEmployees([]);
      }finally{
        setLoading(false);
      }
    }

    async function fetchSettings(){
      try{
        const res = await fetch('/api/settings');
        if(res.ok){
          const data = await res.json();
          if(data.payPerHour !== undefined) setDefaultPay(Number(data.payPerHour));
        }
      }catch(err){
        console.warn('Could not load settings', err.message);
      }
    }

    fetchEmployees();
    fetchSettings();

  }, [] );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#000000] border-dashed rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-[#000000]/70">Loading employees...</p>
        </div>
      </div>
    );
  }

  const handleStartEdit = (id, current) => {
    setEditingId(id);
    setEditingValue(String(current ?? defaultPay));
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingValue('');
  };

  const handleSave = async (id) => {
    const newPay = Number(editingValue);
    if (!newPay || newPay <= 0) {
      alert('Enter a valid amount');
      return;
    }

    try{
      const res = await fetch(`/api/employees/${id}/pay`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPay })
      });
      if(!res.ok) throw new Error('Failed to update pay');
      const data = await res.json();

      // Update local state: set payPerHour on the employee
      setEmployees((prev) => prev.map((emp) => emp._id === id ? { ...emp, payPerHour: newPay } : emp));
      setEditingId(null);
      setEditingValue('');
    }catch(err){
      console.error(err);
      alert('Failed to update pay');
    }
  };

  return (
    <main className="flex-1 px-4 py-6 sm:px-6 md:px-10 space-y-6">
      <h1 className="text-2xl sm:text-2xl font-bold mb-4 text-[#000000]">Employees</h1>
      <div className="backdrop-blur-xl bg-white/10 p-4 sm:p-6 rounded-3xl shadow-2xl border border-[#f7e9ae]/50">
        <h2 className="text-xl font-semibold mb-4 text-[#000000]">All Employees</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-sm sm:text-base">
            <thead>
              <tr className="text-left border-b border-[#f7e9ae]/30 text-[#000000]">
                <th className="px-4 sm:px-6 py-3">Name</th>
                <th className="px-4 sm:px-6 py-3">Email</th>
                <th className="px-4 sm:px-6 py-3">Pay</th>
                <th className="px-4 sm:px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id || index} className="border-b border-[#f7e9ae]/20 text-[#000000]/70 hover:bg-[#f7e9ae]/20">
                  <td className="px-4 sm:px-6 py-4 text-[#000000]">{employee.fullname || employee.name}</td>
                  <td className="px-4 sm:px-6 py-4">
                    <Link href={`/dashboard/employees/${employee._id}`} className="text-black flex gap-2 hover:underline break-all">
                      <CornerDownRight /> {employee.email}
                    </Link>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-[#000000]">
                    {editingId === employee._id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          className="w-28 px-2 py-1 rounded-md border border-[#f7e9ae]/30 bg-[#fff]/5 text-[#000000]"
                        />
                        <button onClick={() => handleSave(employee._id)} className="px-2 py-1 bg-[#000000] text-white rounded-md">Save</button>
                        <button onClick={handleCancel} className="px-2 py-1 border rounded-md">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => handleStartEdit(employee._id, employee.payPerHour)} className="underline">
                        ₦{employee.payPerHour ?? defaultPay}
                      </button>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <button className="bg-[#000000] text-white py-1 px-3 sm:py-2 sm:px-4 shadow rounded-md hover:bg-[#1a1a1a] transition">
                      Terminate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}