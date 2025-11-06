'use client';
import { useState } from 'react';

export default function StaffSettingsPage() {
  const [name, setName] = useState('Talha Staff');
  const [email, setEmail] = useState('staff@example.com');
  const [phone, setPhone] = useState('03XX-XXXXXXX');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleSave = () => {
    alert('Settings updated ✅');
    // Later: POST to /api/user/update
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <main className="min-h-screen text-[#000000] px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">👤 Staff Settings</h1>

      <div className="max-w-xl mx-auto backdrop-blur-xl bg-white/10 p-8 rounded-3xl space-y-6 shadow-2xl border border-[#f7e9ae]/50">
        {/* Profile Picture */}
        <div className="text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-4 border-[#000000]">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#f7e9ae]/50 flex items-center justify-center text-xl text-[#000000] font-bold">?</div>
            )}
          </div>
          <input type="file" onChange={handleImageChange} className="text-sm" />
        </div>

        {/* Name */}
        <div>
          <label className="block font-semibold mb-1 text-[#000000]">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-[#f7e9ae]/50 rounded bg-[#f7e9ae]/20 text-[#000000] placeholder-[#000000]/50"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1 text-[#000000]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-[#f7e9ae]/50 rounded bg-[#f7e9ae]/20 text-[#000000] placeholder-[#000000]/50"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-1 text-[#000000]">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-[#f7e9ae]/50 rounded bg-[#f7e9ae]/20 text-[#000000] placeholder-[#000000]/50"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-semibold mb-1 text-[#000000]">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#f7e9ae]/50 rounded bg-[#f7e9ae]/20 text-[#000000] placeholder-[#000000]/50"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-[#000000] text-white py-3 rounded font-semibold hover:bg-[#1a1a1a] transition"
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}
