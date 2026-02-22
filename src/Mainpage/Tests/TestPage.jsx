import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Download,
  CheckCircle,
  AlertCircle,
  X,
  ArrowLeft,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { marked } from "marked";

function TestPage() {
  const defaultTestData = {
    duration: 1,
    subject: "Loading...",
    chapter: "Please wait",
    paper: "# Test Loading...",
  };
  const [testData, setTestData] = useState(defaultTestData);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem("testData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setTestData(data);
      setTimeRemaining(data.duration * 60);
    } else {
      setTestData({
        duration: 30,
        subject: "Physics",
        chapter: "Quantum Mechanics I",
        paper: `**Section A: Multiple Choice Questions (1 mark each)**

**Question 1.** What is the symbol for velocity?
(a) v
(b) V
(c) u
(d) s

**Question 2.** The SI unit of force is:
(a) Newton
(b) Joule
(c) Watt
(d) Pascal

**Section B: Short Answer Questions (2 marks each)**

**Question 3.** Define speed. Write its formula.

**Question 4.** What is the difference between mass and weight?

**Section C: Long Answer Questions (5 marks each)**

**Question 5.** Explain Newton's First Law of Motion with two real-life examples.

**Question 6.** A car travels 150 km in 3 hours. Calculate its average speed. Show your working.`,
      });
      setTimeRemaining(30 * 60);
    }
  }, []);

  useEffect(() => {
    if (isSubmitted || isTimeUp) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) { setIsTimeUp(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, isTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const timerColor =
    timeRemaining < 60
      ? { bg: "bg-red-50", border: "border-red-300", text: "text-red-600" }
      : timeRemaining < 300
      ? { bg: "bg-orange-50", border: "border-orange-300", text: "text-orange-600" }
      : { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-600" };

  const downloadAsPDF = async () => {
    const element = document.getElementById("test-content");

    const loadingDiv = document.createElement("div");
    loadingDiv.className = "fixed inset-0 z-[101] flex items-center justify-center bg-black/30 backdrop-blur-sm";
    loadingDiv.innerHTML = `
      <div style="background: white; padding: 40px 60px; border-radius: 20px;
                  box-shadow: 0 30px 80px rgba(99,102,241,0.2); text-align: center; border: 2px solid #e0e7ff;">
        <div style="font-size: 24px; font-weight: 800; color: #1e1b4b; margin-bottom: 8px; font-family: 'Syne', sans-serif;">
          Creating your PDF...
        </div>
        <div style="color: #6b7280; font-size: 14px; font-weight: 500;">Please wait a moment ✨</div>
      </div>
    `;
    document.body.appendChild(loadingDiv);

    try {
      const canvas = await html2canvas(element, {
        scale: 2, useCORS: true, logging: false,
        backgroundColor: "#ffffff",
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${testData.subject}_${testData.chapter}_Test_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`;
      pdf.save(fileName);

      setTimeout(() => {
        loadingDiv.innerHTML = `
          <div style="background: white; padding: 40px 60px; border-radius: 20px;
                      box-shadow: 0 30px 80px rgba(34,197,94,0.15); text-align: center; border: 2px solid #bbf7d0;">
            <div style="font-size: 36px; margin-bottom: 10px;">✓</div>
            <div style="font-size: 20px; font-weight: 800; color: #16a34a; margin-bottom: 6px;">PDF Downloaded!</div>
            <div style="color: #6b7280; font-size: 13px;">Check your downloads folder</div>
          </div>
        `;
        setTimeout(() => document.body.removeChild(loadingDiv), 2000);
      }, 500);
    } catch (err) {
      loadingDiv.innerHTML = `
        <div style="background: white; padding: 40px 60px; border-radius: 20px;
                    box-shadow: 0 30px 80px rgba(239,68,68,0.15); text-align: center; border: 2px solid #fecaca;">
          <div style="font-size: 36px; margin-bottom: 10px;">✕</div>
          <div style="font-size: 20px; font-weight: 800; color: #dc2626; margin-bottom: 6px;">Something went wrong</div>
          <div style="color: #6b7280; font-size: 13px;">Please try again</div>
        </div>
      `;
      setTimeout(() => document.body.removeChild(loadingDiv), 3000);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    setIsTimeUp(false);
    downloadAsPDF();
  };

  if (testData.subject === "Loading...") {
    return (
      <div className="min-h-screen bg-[#f5f4ff] flex items-center justify-center">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');`}</style>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-500 mx-auto mb-4"
          />
          <p className="text-gray-500 font-semibold">Loading your test paper...</p>
        </motion.div>
      </div>
    );
  }

  const totalSeconds = testData.duration * 60;
  const progressPercent = totalSeconds > 0 ? (timeRemaining / totalSeconds) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#f5f4ff]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .prose-test h1, .prose-test h2, .prose-test h3 { font-family: 'Syne', sans-serif; }
        .prose-test h3 {
          font-size: 1.1rem; font-weight: 800; color: #3730a3;
          background: #eef2ff; padding: 10px 16px; border-radius: 10px;
          border-left: 4px solid #6366f1; margin-top: 2rem; margin-bottom: 1rem;
        }
        .prose-test p { color: #374151; line-height: 1.8; margin-bottom: 1rem; font-size: 0.95rem; }
        .prose-test strong { color: #1e1b4b; font-weight: 700; }
        .prose-test li { color: #374151; margin-bottom: 0.4rem; font-size: 0.95rem; }
        .prose-test ol, .prose-test ul { padding-left: 1.5rem; }
      `}</style>

      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "linear-gradient(#c7c2ff 1px, transparent 1px), linear-gradient(90deg, #c7c2ff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* HEADER */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/60 shadow-sm"
      >
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-4 min-w-0">
              <motion.button
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => window.close()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>
              <div className="min-w-0">
                <h1 className="text-base font-extrabold text-gray-900 truncate" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {testData.subject}
                </h1>
                <p className="text-xs text-gray-400 font-medium truncate">{testData.chapter}</p>
              </div>
            </div>

            {/* Center: Timer */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-2 font-mono font-bold text-lg ${timerColor.bg} ${timerColor.border} ${timerColor.text} shrink-0`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </motion.div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={downloadAsPDF}
                disabled={isSubmitted || isTimeUp}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold 
                           bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200
                           disabled:opacity-40 transition-all"
              >
                <Download className="w-4 h-4" />
                PDF
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={isSubmitted || isTimeUp}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold
                           bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-200
                           hover:shadow-lg hover:shadow-indigo-300 disabled:opacity-40 transition-all"
              >
                <CheckCircle className="w-4 h-4" />
                {isSubmitted ? "Submitted ✓" : "Submit"}
              </motion.button>
            </div>
          </div>

          {/* Timer progress bar */}
          <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                timeRemaining < 60 ? "bg-red-400" : timeRemaining < 300 ? "bg-orange-400" : "bg-indigo-400"
              }`}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </div>
      </motion.header>

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          id="test-content"
          className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-white overflow-hidden"
          style={{ minHeight: "297mm" }}
        >
          {/* Paper header */}
          <div className="bg-gradient-to-r from-indigo-500 to-violet-600 px-10 py-8 text-white">
            <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-2">
              📝 Test Paper
            </p>
            <h1 className="text-3xl font-extrabold mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
              {testData.subject}
            </h1>
            <p className="text-indigo-100 font-medium text-base">{testData.chapter}</p>
          </div>

          <div className="px-10 py-8">
            {/* Student info */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-5 bg-gray-50 rounded-2xl border border-dashed border-indigo-200">
              {[
                { label: "Name", value: null },
                { label: "Roll No", value: null },
                { label: "Date", value: new Date().toLocaleDateString() },
                { label: "Duration", value: `${testData.duration} minutes` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-gray-700 w-16 shrink-0">{label}:</span>
                  {value ? (
                    <span className="font-semibold text-gray-600">{value}</span>
                  ) : (
                    <span className="flex-1 border-b border-dotted border-gray-400 h-5" />
                  )}
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="mb-8 p-5 bg-amber-50 rounded-2xl border border-amber-200">
              <p className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                📋 Instructions
              </p>
              <ol className="space-y-1.5 text-sm text-gray-600 font-medium list-decimal list-inside">
                <li>Read all questions carefully before you start.</li>
                <li>Write your answers in clear, neat handwriting.</li>
                <li>Show all working and steps for math problems.</li>
                <li>Note marks per question — manage your time wisely.</li>
                <li>Review your answers before submitting. You've got this! 💪</li>
              </ol>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-indigo-200 to-transparent" />
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Questions</span>
              <div className="flex-1 h-px bg-gradient-to-l from-indigo-200 to-transparent" />
            </div>

            {/* Questions */}
            <div
              className="prose-test"
              dangerouslySetInnerHTML={{ __html: marked.parse(testData.paper || "") }}
            />

            {/* Answer reminder */}
            <div className="mt-10 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
              <p className="text-emerald-700 font-semibold text-sm">
                ✍️ Leave adequate space between your answers
              </p>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-dashed border-gray-200 text-center">
              <p className="text-gray-400 font-semibold text-sm">🎓 End of Question Paper</p>
              <p className="text-gray-300 text-xs mt-1">Best of luck — do your best! 🌟</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* TIME UP MODAL */}
      <AnimatePresence>
        {isTimeUp && !isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl border border-red-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
                <AlertCircle className="w-9 h-9 text-red-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                Time's Up!
              </h2>
              <p className="text-gray-500 text-sm font-medium mb-8">
                Great effort! Your time has ended. Submit your test paper now.
              </p>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-2xl text-white font-bold text-sm
                           bg-gradient-to-r from-red-500 to-pink-500
                           shadow-lg shadow-red-200 hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Submit Test Paper
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl border border-emerald-100"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5"
              >
                <CheckCircle className="w-9 h-9 text-emerald-500" />
              </motion.div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                Well Done! 🎉
              </h2>
              <p className="text-gray-500 text-sm font-medium mb-8">
                Test submitted successfully! Your PDF is downloading now.
              </p>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.close()}
                className="w-full py-3.5 rounded-2xl text-white font-bold text-sm
                           bg-gradient-to-r from-indigo-500 to-violet-600
                           shadow-lg shadow-indigo-200 hover:shadow-xl transition-all"
              >
                Close Window
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TestPage;