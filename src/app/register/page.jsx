'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {

      console.log(formData,"Form Data")

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        return toast.error(result.message || 'Registration failed');
      }
      toast.success('Registration successful! Redirecting to login...');

      setTimeout(() => {
        window.location.replace('/');
      }, 2000)

    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!formData.password) return 0;
    let strength = 0;

    // Length check
    if (formData.password.length >= 6) strength += 1;
    if (formData.password.length >= 8) strength += 1;

    // Character diversity
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[0-9]/.test(formData.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;

    return Math.min(strength, 5);
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 px-3 sm:px-4 py-6 sm:py-8">
      <div className="bg-white rounded-2xl sm:rounded-2xl shadow-xl p-5 sm:p-8 max-w-md w-full transition-all duration-300 hover:shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 text-lg sm:text-2xl font-bold rounded-full flex items-center justify-center shadow-md">
            <Image
              src="/logo1.png"
              alt="Panze Logo"
              width={64}
              height={64}
              className="rounded-lg w-full h-full object-contain"
            />
          </div>
        </div>

        <h2 className="text-xl sm:text-3xl font-bold text-center mb-1 sm:mb-2 text-gray-800">Create Your Account</h2>
        <p className="text-center text-xs sm:text-base text-gray-500 mb-5 sm:mb-6">
          Join us to access all features
        </p>

        <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block mb-1.5 sm:mb-2 font-medium text-xs sm:text-sm text-gray-700">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                name="name"
                type="text"
                className={`w-full pl-10 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 text-gray-700 transition-all ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#a87903] focus:border-transparent'
                  }`}
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1.5 sm:mb-2 font-medium text-xs sm:text-sm text-gray-700">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                name="email"
                type="email"
                className={`w-full pl-10 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 text-gray-700 transition-all ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#a87903] focus:border-transparent'
                  }`}
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1.5 sm:mb-2 font-medium text-xs sm:text-sm text-gray-700">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className={`w-full pl-10 sm:pl-10 pr-10 sm:pr-10 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 text-gray-700 transition-all ${errors.password ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#a87903] focus:border-transparent'
                  }`}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-400 hover:text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <FiEye className="text-gray-400 hover:text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}

            {/* Password strength indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i <= passwordStrength
                        ? i <= 2
                          ? 'bg-red-400'
                          : i <= 4
                            ? 'bg-yellow-400'
                            : 'bg-green-500'
                        : 'bg-gray-200'
                        }`}
                    />
                  ))}
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  {passwordStrength <= 2
                    ? 'Weak'
                    : passwordStrength <= 4
                      ? 'Moderate'
                      : 'Strong'}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1.5 sm:mb-2 font-medium text-xs sm:text-sm text-gray-700">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full pl-10 sm:pl-10 pr-10 sm:pr-10 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 text-gray-700 transition-all ${errors.confirmPassword ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#a87903] focus:border-transparent'
                  }`}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="text-gray-400 hover:text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <FiEye className="text-gray-400 hover:text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-white text-sm sm:text-base flex items-center justify-center transition-all ${isLoading
              ? 'bg-[#0e0e0e] cursor-not-allowed'
              : 'bg-[#0e0e0e] hover:bg-[#1d1d1d] shadow-md hover:shadow-lg'
              }`}
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <div className="mt-5 sm:mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 text-xs sm:text-sm">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="mt-4">
            <Link
              href="/"
              className="block w-full text-center py-2 sm:py-2 px-3 sm:px-4 border border-gray-300 rounded-lg font-medium bg-gray-50 text-xs sm:text-base text-[#0e0e0e] hover:bg-[#0e0e0e] hover:border-[#1d1d1d] hover:text-white transition-all"
            >
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}