import React from "react";
import { Link } from "react-router-dom";

function Content() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center p-6 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
      {/* Greenboard background */}
      <img
        src="/content.jpeg"
        alt="Greenboard"
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>

      {/* Back Arrow */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-20 group flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 px-4 py-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <svg 
          className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-white font-semibold text-sm">Back</span>
      </Link>
{/* Dashboard Button - Add this after the Back Arrow Link */}
<Link 
  to="/login" 
  className="absolute top-6 right-6 z-20 group flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 px-4 py-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
>
  <svg 
    className="w-6 h-6 text-white" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
  <span className="text-white font-semibold text-sm">Dashboard</span>
</Link>
      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-10 py-12 gap-6 max-w-5xl">
        {/* Greeting with enhanced styling */}
        <div className="space-y-4 mb-4">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-tight animate-fade-in">
            Hello Champ! 👋
          </h2>
          
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-full shadow-lg"></div>
        </div>

        <p className="text-white text-xl md:text-3xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-4">
          Choose what you want to do today 🎯
        </p>

        {/* Buttons container with enhanced layout */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mt-8">
          {/* Tests Button */}
          <Link to="/tests" className="relative group transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative">
              <img
                src="/btn.png"
                alt="Brush Button Background"
                className="w-72 md:w-80 lg:w-96 select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
              />
              <span className="absolute inset-0 flex items-center justify-center font-black text-xl md:text-3xl text-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)] transition-all duration-300 group-hover:text-gray-900">
                Give Tests
              </span>
            </div>
          </Link>

          {/* Worksheets Button */}
          <Link to="/worksheets" className="relative group transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative">
              <img
                src="/btn.png"
                alt="Brush Button Background"
                className="w-72 md:w-80 lg:w-96 select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
              />
              <span className="absolute inset-0 flex items-center justify-center font-black text-xl md:text-3xl text-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)] transition-all duration-300 group-hover:text-gray-900">
                Solve Worksheets
              </span>
            </div>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="mt-8 flex gap-2 opacity-60">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .delay-75 {
          animation-delay: 75ms;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
}

export default Content;