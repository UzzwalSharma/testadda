import React, { useState, useEffect } from 'react';
import { Trophy, Star, Sparkles, Award, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StudentLeaderboard = () => {
  const [students, setStudents] = useState([
    { name: 'Radhya', stars: 4, avatar: 'https://i.pinimg.com/736x/4c/d7/6c/4cd76cff568c57f863245c0d3f09869b.jpg' },
    { name: 'Shreya', stars: 4.5, avatar: 'https://i.pinimg.com/1200x/3c/57/71/3c5771117cc616a6474395e24bcff7b7.jpg' },
    { name: 'Vidushi', stars: 5, avatar: 'https://i.pinimg.com/736x/67/61/f8/6761f8b3728ee3709ab28533c196e821.jpg' },
  ]);

  useEffect(() => {
    setStudents((prev) => [...prev].sort((a, b) => b.stars - a.stars));
  }, []);

  const renderStars = (stars) => {
    const full = Math.floor(stars);
    const half = stars % 1 !== 0;
    const total = Math.min(full + (half ? 1 : 0), 5);
    return (
      <div className="flex gap-1 justify-center">
        {[...Array(total)].map((_, i) => (
          <div key={i} className="relative">
            {i < full ? (
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ) : (
              <div className="relative">
                <Star className="w-5 h-5 text-gray-200" />
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const rankConfig = [
    { accent: '#f59e0b', accentLight: '#fef3c7', icon: Trophy, iconColor: 'text-amber-500', label: '1st', border: 'border-amber-200' },
    { accent: '#8b5cf6', accentLight: '#ede9fe', icon: Award, iconColor: 'text-violet-500', label: '2nd', border: 'border-violet-200' },
    { accent: '#ec4899', accentLight: '#fce7f3', icon: Sparkles, iconColor: 'text-pink-500', label: '3rd', border: 'border-pink-200' },
  ];

  const chartData = students.map((s, i) => ({
    name: s.name,
    stars: s.stars,
    fill: rankConfig[i]?.accent || '#6366f1',
  }));

  const scoringRules = [
    { label: 'Perfect! 🎉', range: '100%', stars: '★★★★★', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
    { label: 'Amazing! 🌟', range: '90–99%', stars: '★★★★½', bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700' },
    { label: 'Great! 👏', range: '85–89%', stars: '★★★★', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
    { label: 'Good! 💪', range: '75–84%', stars: '★★★', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
    { label: 'Nice! 🌈', range: '60–74%', stars: '★★', bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700' },
    { label: 'Keep Going! 💫', range: '45–59%', stars: '★', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-2xl shadow-xl border border-indigo-100 text-sm font-semibold text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <p className="text-gray-500 font-medium mb-0.5">{payload[0].payload.name}</p>
          <p className="text-amber-500">⭐ {payload[0].value} stars</p>
        </div>
      );
    }
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 16 } },
  };

  return (
    <div className="min-h-screen bg-[#f5f4ff]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');`}</style>

      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "linear-gradient(#c7c2ff 1px, transparent 1px), linear-gradient(90deg, #c7c2ff 1px, transparent 1px)",
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
          style={{ background: "radial-gradient(circle, #fde68a33, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* HEADER */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm"
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

          <span className="text-lg font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Leaderboard
          </span>

          <div className="w-20" />
        </div>
      </motion.header>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">

          {/* HERO */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-xl shadow-amber-200 mb-6"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
              Who's{' '}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Shining Brightest?
              </span>{' '}
              ✨
            </h1>
            <p className="text-gray-500 text-base font-medium">Keep practicing to climb to the top of the board!</p>
          </motion.div>

          {/* PODIUM CARDS */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {students.map((student, index) => {
              const cfg = rankConfig[index];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={student.name}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white rounded-3xl shadow-lg border border-white overflow-hidden flex flex-col items-center p-7 text-center relative"
                  style={{ boxShadow: `0 8px 32px ${cfg.accent}22` }}
                >
                  {/* Rank badge */}
                  <div
                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-md"
                    style={{ background: cfg.accent }}
                  >
                    {cfg.label}
                  </div>

                  {/* Avatar */}
                  <div className="relative mb-4">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-20 h-20 rounded-full object-cover border-4 shadow-lg"
                      style={{ borderColor: cfg.accent }}
                    />
                    {/* Ring glow */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ boxShadow: `0 0 0 4px ${cfg.accent}33` }}
                    />
                  </div>

                  {/* Icon */}
                  <motion.div
                    animate={index === 0 ? { y: [0, -4, 0] } : {}}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="mb-3"
                  >
                    <Icon className={`w-8 h-8 ${cfg.iconColor}`} />
                  </motion.div>

                  {/* Name */}
                  <h3 className="text-xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {student.name}
                  </h3>

                  {/* Stars count */}
                  <div className="text-3xl font-extrabold mb-3" style={{ color: cfg.accent }}>
                    {student.stars} ⭐
                  </div>

                  {/* Star icons */}
                  <div className="mb-4">{renderStars(student.stars)}</div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: cfg.accent }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(student.stars / 5) * 100}%` }}
                      transition={{ duration: 1.2, delay: 0.4 + index * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* BAR CHART */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-lg border border-white p-8">
            <h2 className="text-lg font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
              ⭐ Stars Comparison
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f0ff" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 5]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f5f4ff' }} />
                <Bar dataKey="stars" radius={[10, 10, 0, 0]} animationDuration={1200} animationEasing="ease-out">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* SCORING RULES */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-lg border border-white p-8">
            <h2 className="text-lg font-extrabold text-gray-900 mb-6 text-center" style={{ fontFamily: "'Syne', sans-serif" }}>
              ⭐ How to Earn Stars
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {scoringRules.map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.07 }}
                  className={`${rule.bg} border ${rule.border} rounded-2xl p-4 text-center`}
                >
                  <p className={`text-sm font-bold ${rule.text} mb-1`}>{rule.label}</p>
                  <p className="text-xs text-gray-500 font-medium mb-1">{rule.range}</p>
                  <p className="text-amber-400 text-sm">{rule.stars}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-10 text-sm text-gray-400 font-medium"
        >
          ✨ Keep going — every star counts!
        </motion.p>
      </div>
    </div>
  );
};

export default StudentLeaderboard;