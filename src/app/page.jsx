'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLock, FiMail, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setIsLoading(false);
      console.log(res.error); // Inspect actual error
      toast.error('Something went wrong. Please try again.');
    }

    setIsLoading(false);
    router.push('/dashboard'); // Redirect to home page on successful login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f7e9ae] to-[#c88e3b] px-4 py-8 overflow-y-auto">
      <div className="p-6 sm:p-8 w-full sm:max-w-md sm:bg-white sm:rounded-3xl sm:shadow-lg transition-all duration-300 sm:hover:shadow-xl border sm:border-[#f7e9ae]">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 text-2xl font-bold rounded-full flex items-center justify-center sm:shadow-md">
            <Image
              src="/logo1.png"
              alt="Logo"
              width={100}
              height={100}
              className="rounded-xl"
            />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-[#1a1a1a]">Hey there!</h2>
        <p className="text-center text-sm sm:text-base text-[#000000] mb-6 font-medium">
          Ready to jump back in?
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-[#1a1a1a]">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 border border-[#f7e9ae] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c88e3b] focus:border-transparent text-gray-700 transition-all bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#1a1a1a]">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-10 pr-10 py-3 border border-[#f7e9ae] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c88e3b] focus:border-transparent text-gray-700 transition-all bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="your secret password"
                required
                minLength="6"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-400 hover:text-[#c88e3b]" />
                ) : (
                  <FiEye className="text-gray-400 hover:text-[#c88e3b]" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-[#1a1a1a]">
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-[#000000] hover:text-[#c88e3b] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center ${isLoading
                ? 'bg-[#d2691e] cursor-not-allowed'
                : 'bg-[#1a1a1a] hover:bg-black shadow-md hover:shadow-lg hover:scale-105'
              }`}
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Signing you in...
              </>
            ) : (
              'Let\'s Go!'
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white sm:bg-white text-[#1a1a1a] font-medium">New here?</span>
            </div>
          </div>

          <div className="mt-4">
            <Link
              href="/register"
              className="block w-full text-center py-2 px-4 border border-[#f7e9ae] rounded-xl font-medium bg-[#f7e9ae] text-[#000000] hover:bg-[#000000] hover:text-white hover:border-[#000000] transition-all hover:scale-105"
            >
              Join the fun!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
