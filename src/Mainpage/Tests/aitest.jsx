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
  Sparkle,
  SparklesIcon,
} from "lucide-react";
import { motion } from "framer-motion";

function AiTestGenerator() {
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [duration, setDuration] = useState("60");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject || !chapter) {
      alert("Please enter both subject & chapter.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://localhost:/ai-test-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          chapter,
          duration,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data?.paper) {
        // Store the test data and open the test page
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

        // Open in new window
        window.open("/testpage", "_blank");
      } else {
        alert("Something went wrong. Try again!");
      }
    } catch (error) {
      setLoading(false);
      alert("Oops! Something went wrong. Try again!");
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-300" />
          </motion.div>
        ))}
      </div>

      {/* Bouncing Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-white/90 backdrop-blur-xl shadow-lg border-b-4 border-purple-300 sticky top-0 z-20"
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="cursor-pointer group inline-flex items-center gap-2 px-5 py-3 rounded-2xl 
                         bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold 
                         shadow-lg hover:shadow-2xl transition-shadow"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </motion.button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg"
              >
                <BrainCircuit className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Test Challenge!
              </h2>
            </motion.div>
          </div>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* HERO SECTION */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="inline-block mb-6"
            >
              <Rocket className="w-20 h-20 text-purple-600 mx-auto" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black 
                         bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 
                         bg-clip-text text-transparent leading-tight mb-6"
            >
              Ready for the Ultimate Challenge?
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-700 text-xl font-semibold max-w-3xl mx-auto"
            >
              🚀 Lets see can you kill this Ai generated test ? 🌟
            </motion.p>

            {/* Fun Icons Row */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-6 mt-8"
            >
              {[Trophy, Star, Zap].map((Icon, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="p-4 bg-white rounded-full shadow-lg"
                >
                  <Icon className="w-8 h-8 text-yellow-500" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* FORM CARD */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="bg-white/95 backdrop-blur-xl border-4 border-purple-300 rounded-[2.5rem] shadow-2xl p-10 space-y-8"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* SUBJECT */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="font-black text-gray-800 text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  What Subject?
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border-4 border-purple-200 shadow-lg 
                             focus:ring-4 focus:ring-purple-300 focus:border-purple-400 outline-none
                             text-lg font-semibold transition-all"
                  placeholder="Like Math, Science, History..."
                />
              </motion.div>

              {/* CHAPTER */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="font-black text-gray-800 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                  Which Chapter?
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border-4 border-pink-200 shadow-lg 
                             focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none
                             text-lg font-semibold transition-all"
                  placeholder="Like 'Motion', 'Prime Time', 'Fractions'..."
                />
              </motion.div>

              {/* DURATION */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="font-black text-gray-800 text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  How Long? (minutes)
                </label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 
                             border-4 border-blue-200 rounded-2xl shadow-lg"
                >
                  <Clock className="w-6 h-6 text-blue-600" />
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-transparent outline-none text-lg font-bold"
                    min="10"
                  />
                  <span className="font-bold text-blue-600">mins</span>
                </motion.div>
              </motion.div>

              {/* GENERATE BUTTON */}
              <motion.div variants={itemVariants} className="text-center pt-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerate}
                  disabled={loading}
                  className="px-16 cursor-pointer py-4 rounded-3xl text-white font-black text-2xl 
                             bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 
                             shadow-2xl hover:shadow-purple-500/50 transition-all duration-300
                             relative overflow-hidden group disabled:opacity-70"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0  bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />

                  {loading ? (
                    <span className="flex items-center gap-3 justify-center relative z-10 animate-pulse cursor-pointer" >
                      <Sparkles className="w-6 h-6" />
                      Creating Magic...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3 justify-center relative z-10">
                      Generate My Test!
                      <SparklesIcon className="w-6 h-6" />
                    </span>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Encouraging Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-white/90 backdrop-blur-lg rounded-3xl px-8 py-4 shadow-xl border-4 border-yellow-300">
              <p className="text-2xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Believe in yourself! You're amazing!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AiTestGenerator;
