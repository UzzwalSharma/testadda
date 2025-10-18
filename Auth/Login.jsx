import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, ArrowLeft } from "lucide-react";
import { useConvex } from "convex/react";
import { api } from "../convex/_generated/api";
import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const convex = useConvex();

async function handleLogin(e) {
  e.preventDefault();

  if (!name.trim() || !password.trim()) {
    toast.error("Please enter both name and password");
    return;
  }

  setLoading(true);

  try {
    // Call Convex function directly
    const res = await convex.query(api.login.checkLogin, { name, password });

    if (res.success) {
    toast.success("Login successful!");
    onLogin(res.student);
    navigate("/dashboard"); 
  } else {
    toast.error("Invalid credentials");
  }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
}


  function handleGoBack() {
    window.history.back();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex justify-center items-center relative overflow-hidden p-4">
      <Toaster position="top-center" />
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
      
      {/* Top Left Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-8 left-8 w-28 h-28 sm:w-36 sm:h-36"
      >
        <img 
          src="/login1.jpeg" 
          alt="Decoration" 
          className="w-full h-full object-cover rounded-full border-4 border-red-300 shadow-xl opacity-90"
        />
      </motion.div>

      {/* Bottom Right Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-8 right-8 w-28 h-28 sm:w-36 sm:h-36"
      >
        <img 
          src="/login2.jpeg" 
          alt="Decoration" 
          className="w-full h-full object-cover rounded-full border-4 border-pink-300 shadow-xl opacity-90"
        />
      </motion.div>

      {/* Main Content */}
      <div className="flex items-center justify-center max-w-6xl w-full">
        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Tuition अड्डा
            </motion.h1>
            <p className="text-sm text-gray-500">Welcome back, student!</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              type="button"
              onClick={handleGoBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </motion.button>
          </form>
        </motion.div>

     
      </div>
        <footer className="w-full text-center py-4 absolute bottom-0 left-0 animate-pulse">
      <p>Made with ❤️ by Ujjwal Sharma</p>
     </footer>
    </div>
  );
}