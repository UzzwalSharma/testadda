import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Download, FileText, Calendar, BookOpen } from "lucide-react";

function DownloadWorksheetsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const worksheets = useQuery(api.worksheets.getAll) || null;

  const filteredWorksheets =
    worksheets?.filter(
      (w) =>
        w.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.chapter.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleDownload = (driveLink) => {
    window.open(driveLink, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 16 } },
  };

  return (
    <div className="min-h-screen bg-[#f5f4ff]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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

      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #a5b4fc44, transparent 70%)" }}
          animate={{ scale: [1, 1.08, 1], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #f9a8d433, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* HEADER */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
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
            Worksheets
          </span>

          {/* Spacer to balance header */}
          <div className="w-20" />
        </div>
      </motion.header>

      {/* MAIN */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-xl shadow-pink-200 mb-6"
          >
            <FileText className="w-10 h-10 text-white" />
          </motion.div>

          <h1
            className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Download{" "}
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Worksheets
            </span>
          </h1>
          <p className="text-gray-500 text-base font-medium">
            Practice makes perfect — pick a worksheet and get started! 📚
          </p>
        </motion.div>

        {/* SEARCH */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by subject or chapter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 rounded-2xl border-2 border-gray-100 bg-white
                         text-sm font-medium text-gray-800 placeholder:text-gray-300
                         outline-none transition-all duration-200
                         focus:border-indigo-300 focus:bg-white focus:shadow-lg focus:shadow-indigo-100"
            />
          </div>
        </motion.div>

        {/* STATES */}
        <AnimatePresence mode="wait">

          {/* Loading */}
          {!worksheets && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-28 gap-5"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-500"
              />
              <p className="text-gray-400 font-semibold text-sm">Loading worksheets...</p>
            </motion.div>
          )}

          {/* Empty */}
          {worksheets && filteredWorksheets.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-28"
            >
              <div className="bg-white rounded-3xl shadow-lg shadow-indigo-100/40 border border-white p-10 max-w-sm text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3
                  className="text-lg font-extrabold text-gray-900 mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {searchQuery ? `No results for "${searchQuery}"` : "No worksheets yet"}
                </h3>
                <p className="text-gray-400 text-sm font-medium">
                  Try another keyword or check back later!
                </p>
              </div>
            </motion.div>
          )}

          {/* Grid */}
          {worksheets && filteredWorksheets.length > 0 && (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredWorksheets.map((worksheet) => (
                <motion.div
                  key={worksheet._id}
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="bg-white rounded-3xl shadow-lg shadow-indigo-100/40 border border-white overflow-hidden flex flex-col"
                >
                  {/* Card top strip */}
                  <div className={`bg-gradient-to-r ${worksheet.color} p-6 text-white text-center relative`}>
                    {worksheet.imageUrl && (
                      <img
                        src={worksheet.imageUrl}
                        alt={worksheet.chapter}
                        className="w-14 h-14 mx-auto mb-3 object-contain rounded-2xl shadow-md bg-white/20"
                      />
                    )}
                    {!worksheet.imageUrl && (
                      <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 flex items-center justify-center">
                        <BookOpen className="w-7 h-7 text-white" />
                      </div>
                    )}
                    <h3
                      className="text-base font-extrabold leading-tight"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {worksheet.chapter}
                    </h3>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    {/* Tags row */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                        {worksheet.subject}
                      </span>
                      <span className="bg-gray-50 text-gray-500 px-3 py-1 rounded-full text-xs font-semibold">
                        {worksheet.pages} pages
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
                      {worksheet.description}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        Due:{" "}
                        {new Date(worksheet.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Download button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleDownload(worksheet.driveLink)}
                      className="mt-1 w-full py-3 rounded-2xl text-white text-sm font-bold
                                 flex items-center justify-center gap-2
                                 bg-gradient-to-r from-indigo-500 to-violet-600
                                 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 transition-shadow"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 text-center pb-10 text-sm text-gray-400 font-medium"
      >
        ✨ Every worksheet you complete is a step forward!
      </motion.p>
    </div>
  );
}

export default DownloadWorksheetsSection;