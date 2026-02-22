import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Trophy, ArrowRight } from "lucide-react";

function TestsSection() {
  const [selectedTest, setSelectedTest] = useState(null);
  const navigate = useNavigate();

  const testTypes = [
    {
      id: 1,
      title: "MCQ Test",
      description: "Multiple choice questions to sharpen your recall and test your knowledge across topics.",
      imageUrl: "/ad.gif",
      isLocked: true,
      route: "/mcq-test",
      accent: "#6366f1",
      accentLight: "#eef2ff",
      badge: "Coming Soon",
    },
    {
      id: 2,
      title: "AI Competitor",
      description: "Go head-to-head with AI and prove your concept mastery in real time.",
      imageUrl: "/META.gif",
      isLocked: false,
      route: "/ai-test",
      accent: "#8b5cf6",
      accentLight: "#f5f3ff",
      badge: "Popular",
    },
    {
      id: 3,
      title: "Chapter-wise Test",
      description: "Practice specific chapters at your own pace with targeted questions.",
      imageUrl: "/full.gif",
      isLocked: false,
      route: "/chapterwisetest",
      accent: "#10b981",
      accentLight: "#ecfdf5",
      badge: "New",
    },
  ];

  const handleTestClick = (test) => {
    if (!test.isLocked) {
      setSelectedTest(test.id);
      navigate(test.route);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 16 } },
  };

  return (
    <div className="min-h-screen bg-[#f5f4ff]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');`}</style>

      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(#c7c2ff 1px, transparent 1px), linear-gradient(90deg, #c7c2ff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft radial blobs */}
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
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>

          <span
            className="text-lg font-extrabold text-gray-900 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Revision Tests
          </span>
        </div>
      </motion.header>

      {/* MAIN */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-14">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1
            className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Choose Your{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
              Challenge
            </span>
          </h1>
          <p className="text-gray-500 text-base font-medium max-w-xl mx-auto">
            Tests help you understand concepts better. The best way to learn is through practice — pick your mode and get started.
          </p>
        </motion.div>

        {/* CARDS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {testTypes.map((test) => (
            <motion.div
              key={test.id}
              variants={cardVariants}
              whileHover={!test.isLocked ? { y: -6, scale: 1.01 } : {}}
              className={`bg-white rounded-3xl shadow-lg shadow-indigo-100/40 border border-white overflow-hidden flex flex-col
                          ${test.isLocked ? "opacity-80" : "cursor-pointer"}`}
              onClick={() => handleTestClick(test)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={test.imageUrl}
                  alt={test.title}
                  className="w-full h-full object-cover"
                />
                {/* Badge */}
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                  style={{ background: test.isLocked ? "#9ca3af" : test.accent }}
                >
                  {test.badge}
                </div>
                {/* Lock overlay */}
                {test.isLocked && (
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/90 shadow-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="text-lg font-extrabold text-gray-900 mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {test.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                  {test.description}
                </p>

                {/* CTA */}
                <motion.button
                  whileHover={!test.isLocked ? { scale: 1.03 } : {}}
                  whileTap={!test.isLocked ? { scale: 0.97 } : {}}
                  disabled={test.isLocked}
                  onClick={(e) => { e.stopPropagation(); handleTestClick(test); }}
                  className={`w-full py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all
                    ${test.isLocked
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "text-white shadow-md hover:shadow-lg"
                    }`}
                  style={!test.isLocked ? { background: `linear-gradient(135deg, ${test.accent}, ${test.accent}dd)`, boxShadow: `0 6px 20px ${test.accent}33` } : {}}
                >
                  {test.isLocked ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Locked
                    </>
                  ) : (
                    <>
                      Start Test
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* LEADERBOARD BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/leaderboard")}
            className="relative overflow-hidden flex items-center gap-3 px-8 py-3.5 rounded-2xl text-white font-bold text-sm
                       bg-gradient-to-r from-indigo-500 to-violet-600
                       shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-shadow cursor-pointer"
          >
            {/* shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
            />
            <Trophy className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Check Leaderboard</span>
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-10 text-sm text-gray-400 font-medium"
        >
          ✨ Practice makes perfect — keep going!
        </motion.p>
      </div>
    </div>
  );
}

export default TestsSection;