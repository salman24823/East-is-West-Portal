import React from 'react'
import Sidebar from '../components/Sidebar'
import { ToastContainer } from 'react-toastify'
import AuthProvider from '../components/SessionProvider'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7e9ae] via-[#f0d98f] to-[#c88e3b] relative overflow-hidden">
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

      <AuthProvider>
        <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
          {/* Mobile offset for header */}
          <div className="lg:hidden h-16"></div>

          <ToastContainer />
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </AuthProvider>
    </div>
  )
}

export default Layout
