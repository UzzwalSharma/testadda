import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, LayoutDashboard, ClipboardList, FileText } from "lucide-react";

function Content() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 16 } },
  };

  return (
    <div className="min-h-screen bg-[#f5f4ff] relative overflow-hidden flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');`}</style>

      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(#c7c2ff 1px, transparent 1px), linear-gradient(90deg, #c7c2ff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Animated blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, #a5b4fc44, transparent 70%)" }}
          animate={{ scale: [1, 1.08, 1], x: [0, 24, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #f9a8d433, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], y: [0, -24, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #6ee7b733, transparent 70%)" }}
          animate={{ scale: [1, 1.06, 1], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* HEADER */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="relative z-30 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm"
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </motion.div>

          <span
            className="text-lg font-extrabold text-gray-900 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Tuition adda
          </span>

          <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </motion.div>
        </div>
      </motion.header>

      {/* MAIN */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-3xl flex flex-col items-center text-center"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-10">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-200 mb-6 text-4xl"
            >
              👋
            </motion.div>

            <h1
              className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Hello,{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
                Champ!
              </span>
            </h1>

            <p className="text-gray-500 text-lg font-medium">
              What would you like to do today? 🎯
            </p>
          </motion.div>

          {/* Action Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl"
          >
            {/* Tests Card */}
            <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/tests" className="block">
                <div className="group bg-white rounded-3xl shadow-lg shadow-indigo-100/50 border border-white p-8 flex flex-col items-center gap-5 hover:shadow-xl hover:shadow-indigo-200/60 transition-shadow duration-300">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-200 flex items-center justify-center">
                    <ClipboardList className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h2
                      className="text-xl font-extrabold text-gray-900 mb-1"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Give Tests
                    </h2>
                    <p className="text-gray-400 text-sm font-medium">
                      Challenge yourself with AI-powered tests
                    </p>
                  </div>

                  <div className="w-full py-3 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 shadow-md shadow-indigo-200 group-hover:shadow-lg group-hover:shadow-indigo-300 transition-shadow">
                    Start Now →
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Worksheets Card */}
            <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/worksheets" className="block">
                <div className="group bg-white rounded-3xl shadow-lg shadow-pink-100/50 border border-white p-8 flex flex-col items-center gap-5 hover:shadow-xl hover:shadow-pink-200/60 transition-shadow duration-300">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-md shadow-pink-200 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h2
                      className="text-xl font-extrabold text-gray-900 mb-1"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Solve Worksheets
                    </h2>
                    <p className="text-gray-400 text-sm font-medium">
                      Practice at your own pace with worksheets
                    </p>
                  </div>

                  <div className="w-full py-3 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 shadow-md shadow-pink-200 group-hover:shadow-lg group-hover:shadow-pink-300 transition-shadow">
                    Start Now →
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Footer note */}
          <motion.p
            variants={itemVariants}
            className="mt-12 text-sm text-gray-400 font-medium"
          >
            ✨ Every session brings you closer to your goal!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default Content;