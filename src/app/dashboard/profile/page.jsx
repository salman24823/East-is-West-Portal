'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ProfilePage() {
  return (
    <main className="min-h-screen p-4">

      <div className="relative w-full h-60 rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1532892939738-86e29515dc9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="cover"
          fill
          className="object-cover"
        />
        <div className="absolute -bottom-1 left-6">
          <img
            src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp"
            alt="Avatar"
            width={120}
            height={120}
            className="rounded-full border-4 border-[#f7e9ae] object-cover"
          />
        </div>
      </div>

      <div className="pt-20 pl-6">
        <h1 className="text-2xl font-bold text-[#000000]">John don24</h1>
        <p className="text-[#000000]/70">CTO</p>
      </div>


      <div className="mt-4 px-6 flex space-x-8 border-b border-[#f7e9ae]/30">
        {[
          ['Profile', '🧾'],
          ['Followers', '❤️'],
          ['Friends', '👥'],
          ['Gallery', '🖼️'],
        ].map(([label, icon], i) => (
          <button
            key={i}
            className={`pb-2 flex items-center space-x-2 text-[#000000]/70 font-medium ${
              label === 'Profile' ? 'border-b-2 border-[#000000] text-[#000000]' : ''
            }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 px-6">
      
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 shadow-2xl border border-[#f7e9ae]/50">
          <div className="flex justify-between text-center">
            <div>
              <div className="text-2xl font-bold text-[#000000]">1,947</div>
              <div className="text-sm text-[#000000]/70">Follower</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#000000]">9,124</div>
              <div className="text-sm text-[#000000]/70">Following</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 backdrop-blur-xl bg-white/10 rounded-3xl p-6 shadow-2xl border border-[#f7e9ae]/50 text-[#000000]">
          Feedback
  <textarea
    rows={3}
    placeholder="Share what you are thinking here..."
    className="w-full p-3 border border-[#f7e9ae]/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#c88e3b] bg-[#f7e9ae]/20 text-[#000000] placeholder-[#000000]/50"
  />

  <div className="flex justify-between items-center mt-4">
  <form action="#" className="w-full space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-[#000000]">First Name</label>
        <input
          className="border border-[#f7e9ae]/50 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#c88e3b] bg-[#f7e9ae]/20 text-[#000000] placeholder-[#000000]/50"
          type="text"
          placeholder="First name"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-[#000000]">Last Name</label>
        <input
          className="border border-[#f7e9ae]/50 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#c88e3b] bg-[#f7e9ae]/20 text-[#000000] placeholder-[#000000]/50"
          type="text"
          placeholder="Last name"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-[#000000]">Username</label>
        <input
          className="border border-[#f7e9ae]/50 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#c88e3b] bg-[#f7e9ae]/20 text-[#000000] placeholder-[#000000]/50"
          type="text"
          placeholder="Enter Username"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-[#000000]">Password</label>
        <input
          className="border border-[#f7e9ae]/50 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#c88e3b] bg-[#f7e9ae]/20 text-[#000000] placeholder-[#000000]/50"
          type="password"
          placeholder="Enter password"
        />
      </div>
    </div>

    <button
      type="submit"
      className="bg-[#000000] text-white px-6 py-2 rounded-lg mt-2 hover:bg-[#1a1a1a] transition"
    >
      Submit
    </button>
  </form>
</div>

</div>

      </div>
      <div className="mt-6 px-6">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 shadow-2xl border border-[#f7e9ae]/50 w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-2 text-[#000000]">About</h2>
          <p className="text-[#000000]/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>
    </main>
  );
}
