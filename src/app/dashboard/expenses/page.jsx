'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

export default function ExpensePage() {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [notification, setNotification] = useState(null);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!item || !amount) {
      setNotification({ type: 'error', message: 'Please fill all fields' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const newExpense = {
      item,
      amount: parseFloat(amount),
      date: new Date().toLocaleString(),
    };

    try {
      const res = await fetch('/api/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
      });

      const data = await res.json();

      if (res.ok) {
        setExpenses([data.expense, ...expenses]);
        setItem('');
        setAmount('');
        setNotification({ type: 'success', message: 'Expense added successfully' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        throw new Error(data.message || 'Failed to save expense');
      }
    } catch (error) {
      setNotification({ type: 'error', message: error.message });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDeleteExpense = (index) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);

    setNotification({ type: 'success', message: 'Expense deleted successfully' });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchExpenses = async () => {
    try {
      const res = await fetch('/api/expense');
      const data = await res.json();
      setExpenses(data.expenses || []);
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to fetch expenses' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2);

  return (
    <main className="min-h-screen w-full p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl overflow-hidden border border-[#f7e9ae]/50">
          <div className="bg-[#000000] p-2 text-white flex justify-between items-center">
            <h2 className="text-1xl font-bold ml-4">Expense Manager</h2>
            <p className="text-[#f7e9ae] mt-1 mr-4">Track your spending easily</p>
          </div>

          {/* Form */}
          <form onSubmit={handleAddExpense} className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-sm font-medium text-[#000000] mb-1">Expense Title</label>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  className="w-full px-4 py-2 border border-[#f7e9ae]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c88e3b] bg-[#f7e9ae]/20 text-[#000000] placeholder-[#000000]/50"
                  placeholder="e.g. Grocery, Netflix"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#000000] mb-1">Amount (£)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-[#f7e9ae]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c88e3b] bg-[#f7e9ae]/20 text-[#000000] placeholder-[#000000]/50"
                  placeholder="e.g. 50.00"
                  required
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-[#000000] hover:bg-[#1a1a1a] text-white px-8 py-3 rounded-lg font-semibold shadow-md"
                >
                  Add Expense
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Total */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-[#f7e9ae]/50">
          <h2 className="text-base sm:text-xl font-bold text-[#000000]">Total Expenses</h2>
          <p className="text-3xl sm:text-4xl font-bold text-[#000000] mt-2">£{totalExpenses}</p>
        </div>

        {/* Expense List */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-3 sm:p-6 border border-[#f7e9ae]/50">
          <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-4 text-[#000000]">Expense History</h2>

          {expenses.length === 0 ? (
            <p className="text-center py-6 sm:py-8 text-xs sm:text-base text-[#000000]/70">No expenses added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#f7e9ae]/30 text-xs sm:text-sm">
                <thead className="bg-[#c88e3b]/20">
                  <tr>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">Item</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">Amount</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">Date</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-[#000000] uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-[#f7e9ae]/20">
                  {expenses.map((exp, i) => (
                    <tr key={exp._id || i} className="hover:bg-[#f7e9ae]/20">
                      <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-[#000000] truncate">{exp.item}</td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-bold text-[#000000]">£{exp.amount.toFixed(2)}</td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-[#000000]/70">{exp.date}</td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 text-right">
                        <button
                          onClick={() => handleDeleteExpense(i)}
                          className="text-[#000000] hover:text-[#c88e3b] transition"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-md shadow-lg text-white z-50 ${
            notification.type === 'success' ? 'bg-[#c88e3b]' : 'bg-red-500'
          }`}
        >
          {notification.message}
        </div>
      )}
    </main>
  );
}
