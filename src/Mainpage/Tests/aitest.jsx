import React, { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  BrainCircuit,
  Clock,
  Zap,
  Trophy,
  Star,
  Rocket,
  SparklesIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function AiTestGenerator() {
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [duration, setDuration] = useState("60");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleGenerate = async () => {
    if (!subject || !chapter) {
      alert("Please enter both subject & chapter.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://tuitionserver.onrender.com/ai-test-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, chapter, duration }),
      });

      const data = await response.json();
      setLoading(false);

      if (data?.paper) {
        sessionStorage.setItem(
          "testData",
          JSON.stringify({
            paper: data.paper,
            duration: parseInt(duration),
            subject,
            chapter,
            startTime: Date.now(),
          })
        );
        window.open("/testpage", "_blank");
      } else {
        alert("Something went wrong. Try again!");
      }
    } catch (error) {
      setLoading(false);
      alert("Oops! Something went wrong. Try again!");
    }
  };

  const fields = [
    {
      id: "subject",
      label: "Subject",
      icon: BookOpen,
      value: subject,
      setter: setSubject,
      placeholder: "e.g. Mathematics, Science, History",
      color: "indigo",
    },
    {
      id: "chapter",
      label: "Chapter",
      icon: Sparkles,
      value: chapter,
      setter: setChapter,
      placeholder: "e.g. Motion, Fractions, World War II",
      color: "violet",
    },
  ];

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#f5f4ff] relative overflow-hidden"
    >
      {/* Google Font */}
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
          style={{ background: "radial-gradient(circle, #a5b4fc55, transparent 70%)" }}
          animate={{ scale: [1, 1.08, 1], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #f9a8d455, transparent 70%)" }}
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
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>

          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md"
            >
              <BrainCircuit className="w-5 h-5 text-white" />
            </motion.div>
            <span
              style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-lg font-extrabold text-gray-900 tracking-tight"
            >
              AI Test Challenge
            </span>
          </div>
        </div>
      </motion.header>

      {/* MAIN */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-14">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-200 mb-6"
          >
            <Rocket className="w-10 h-10 text-white" />
          </motion.div>

          <h1
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3"
          >
            Ready for the{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
              Ultimate Challenge?
            </span>
          </h1>

          <p className="text-gray-500 text-base font-medium">
            Generate a personalized AI-powered test and see how you score 🚀
          </p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6 mt-8"
          >
            {[
              { icon: Trophy, label: "Smart Questions", color: "#f59e0b" },
              { icon: Zap, label: "Instant Results", color: "#6366f1" },
              { icon: Star, label: "Personalized", color: "#ec4899" },
            ].map(({ icon: Icon, label, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{ background: `${color}18` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <span className="text-xs font-semibold text-gray-500">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 18 }}
          className="bg-white rounded-3xl shadow-xl shadow-indigo-100/60 border border-white p-8 space-y-6"
        >
          {/* Text Fields */}
          {fields.map(({ id, label, icon: Icon, value, setter, placeholder, color }, idx) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + idx * 0.1 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icon className="w-4 h-4 text-indigo-500" />
                {label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  onFocus={() => setFocusedField(id)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={placeholder}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 
                             text-gray-900 font-medium placeholder:text-gray-300 text-sm
                             outline-none transition-all duration-200
                             focus:border-indigo-300 focus:bg-white focus:shadow-lg focus:shadow-indigo-100"
                />
                <AnimatePresence>
                  {focusedField === id && (
                    <motion.div
                      key="ring"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ boxShadow: "0 0 0 3px #6366f125" }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

          {/* Duration */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
            className="space-y-2"
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Clock className="w-4 h-4 text-indigo-500" />
              Duration (minutes)
            </label>
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 focus-within:border-indigo-300 focus-within:bg-white transition-all duration-200">
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="10"
                className="flex-1 bg-transparent outline-none text-sm font-semibold text-gray-900"
              />
              <span className="text-xs font-semibold text-gray-400 bg-gray-200 px-2.5 py-1 rounded-lg">
                min
              </span>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-100" />

          {/* Generate Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleGenerate}
              disabled={loading}
              className="w-full relative overflow-hidden py-4 rounded-2xl text-white font-bold text-base
                         bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600
                         shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300
                         transition-shadow duration-300 disabled:opacity-60 cursor-pointer"
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5 }}
              />
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2.5 relative z-10"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Generating your test...
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2.5 relative z-10"
                  >
                    Generate My Test
                    <SparklesIcon className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-sm text-gray-400 font-bold"
        >
          ✨ Believe in yourself — you've got this!
        </motion.p>
      </div>
    </div>
  );
}

export default AiTestGenerator;