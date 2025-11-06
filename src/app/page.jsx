'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLock, FiMail, FiEye, FiEyeOff, FiLoader, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setIsLoading(false);
      setError('Invalid email or password. Please try again.');
    } else {
      toast.success('Welcome back!');
      router.push('/dashboard');
    }
  };

  const getFieldValidation = () => {
    const validations = {
      email: email.includes('@') && email.includes('.'),
      password: password.length >= 6
    };
    return validations;
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#f7e9ae] via-[#f0d98f] to-[#c88e3b] px-4 py-8 overflow-hidden">
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

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 border border-[#f7e9ae]/50 group">
          
          {/* Ambient Light Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#c88e3b]/10 to-[#f7e9ae]/10 opacity-0 group-hover:opacity-100 blur-xl"></div>
          
          {/* Logo Section */}
          <div className="flex justify-center mb-8 relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c88e3b] to-[#f7e9ae] rounded-2xl blur-lg opacity-30 group-hover:opacity-50"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-2xl p-3 shadow-lg border border-white/20">
                <Image
                  src="/logo1.png"
                  alt="Logo"
                  width={70}
                  height={70}
                  className="rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#000000] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#000000]/70 font-medium">
              Sign in to access your account
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-start gap-3 backdrop-blur-sm">
              <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-[#000000]">Email Address</label>
                {email && getFieldValidation().email && (
                  <FiCheck className="w-4 h-4 text-green-400" />
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className={`w-5 h-5 ${
                    emailFocused ? 'text-[#000000]' : 'text-black/80'
                  }`} />
                </div>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/30 border-2 border-[#d3aa07] rounded-xl focus:outline-none focus:border-[#c88e3b] focus:ring-4 focus:ring-[#c88e3b]/20 text-black placeholder-black/80 hover:border-[#c88e3b]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-[#000000]">Password</label>
                {password && getFieldValidation().password && (
                  <FiCheck className="w-4 h-4 text-green-400" />
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className={`w-5 h-5 ${
                    passwordFocused ? 'text-[#000000]' : 'text-black/80'
                  }`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-12 pr-12 py-3.5 bg-white/30 border-2 border-[#d3aa07] rounded-xl focus:outline-none focus:border-[#c88e3b] focus:ring-4 focus:ring-[#c88e3b]/20 text-black placeholder-black/80 hover:border-[#c88e3b]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="Enter your password"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center group"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5 text-black/60 hover:text-[#c88e3b]" />
                  ) : (
                    <FiEye className="w-5 h-5 text-black/60 hover:text-[#c88e3b]" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-black/35 border-black rounded focus:ring-2 cursor-pointer bg-white/5 checked:bg-black"
                  />
                </div>
                <span className="ml-2 text-sm text-black">
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-black hover:text-[#000000] font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white flex items-center justify-center shadow-lg group ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#000000] to-[#1a1a1a] hover:from-[#1a1a1a] hover:to-[#000000] shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin mr-2 w-5 h-5" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#f7e9ae]/50"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-transparent text-sm text-[#000000]/70 font-medium">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <Link
            href="/register"
            className="block w-full text-center py-3.5 px-6 border-2 border-[#c88e3b]/50 rounded-xl font-semibold bg-[#f7e9ae] text-[#000000] hover:bg-[#c88e3b] hover:text-white hover:border-[#c88e3b] shadow-lg group"
          >
            <span className="flex items-center justify-center">
              Create Account
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </span>
          </Link>

          {/* Security Note */}
          <p className="text-center text-xs text-[#000000]/90 mt-6">
            🔒 Your data is securely encrypted
          </p>
        </div>
      </div>
    </div>
  );
}