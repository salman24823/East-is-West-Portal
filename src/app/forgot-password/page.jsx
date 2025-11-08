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
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#f7e9ae] via-[#f0d98f] to-[#c88e3b] px-3 sm:px-4 py-6 sm:py-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#c88e3b]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 sm:w-96 h-56 sm:h-96 bg-[#f7e9ae]/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-40 sm:w-64 h-40 sm:h-64 bg-[#c88e3b]/15 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 border border-[#f7e9ae]/50">
          {/* Back to Login */}
          <Link href="/" className="inline-flex items-center text-[#000000] hover:text-[#c88e3b] mb-4 sm:mb-6 text-sm sm:text-base">
            <FiArrowLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Back to Login
          </Link>

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-3xl font-bold text-[#000000] mb-1 sm:mb-2">Forgot Password</h1>
            <p className="text-xs sm:text-base text-[#000000]/70">Enter your email to reset your password</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="relative">
              <label className="text-xs sm:text-sm font-medium text-[#000000] mb-1.5 sm:mb-2 block">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <FiMail className="w-4 h-4 sm:w-5 sm:h-5 text-[#000000]/70" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-sm sm:text-base bg-white/30 border-2 border-[#d3aa07] rounded-lg sm:rounded-xl focus:outline-none focus:border-[#c88e3b] focus:ring-4 focus:ring-[#c88e3b]/20 text-black placeholder-black/80 hover:border-[#c88e3b]"
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
              className={`w-full py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-white flex items-center justify-center shadow-lg text-sm sm:text-base ${
                isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-[#000000] to-[#1a1a1a] hover:from-[#1a1a1a] hover:to-[#000000] shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-[#000000]/90 mt-4 sm:mt-6">
            Remember your password? <Link href="/" className="text-[#c88e3b] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}