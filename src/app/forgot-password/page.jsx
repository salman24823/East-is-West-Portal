'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMail, FiLoader, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('If an account with that email exists, we have sent a password reset link.');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#f7e9ae] via-[#f0d98f] to-[#c88e3b] px-4 py-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#c88e3b]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#f7e9ae]/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#c88e3b]/15 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 border border-[#f7e9ae]/50">
          {/* Back to Login */}
          <Link href="/" className="inline-flex items-center text-[#000000] hover:text-[#c88e3b] mb-6">
            <FiArrowLeft className="mr-2" />
            Back to Login
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#000000] mb-2">Forgot Password</h1>
            <p className="text-[#000000]/70">Enter your email to reset your password</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="text-sm font-medium text-[#000000] mb-2 block">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="w-5 h-5 text-[#000000]/70" />
                </div>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/30 border-2 border-[#d3aa07] rounded-xl focus:outline-none focus:border-[#c88e3b] focus:ring-4 focus:ring-[#c88e3b]/20 text-black placeholder-black/80 hover:border-[#c88e3b]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white flex items-center justify-center shadow-lg ${
                isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-[#000000] to-[#1a1a1a] hover:from-[#1a1a1a] hover:to-[#000000] shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin mr-2 w-5 h-5" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-[#000000]/90 mt-6">
            Remember your password? <Link href="/" className="text-[#c88e3b] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}