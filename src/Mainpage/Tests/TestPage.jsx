import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Clock,
  Download,
  CheckCircle,
  AlertCircle,
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
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsTimeUp(true);
          return 0;
        }
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

  const downloadAsPDF = async () => {
    const element = document.getElementById("test-content");

    const loadingDiv = document.createElement("div");
    loadingDiv.className = "fixed inset-0 z-[101] flex items-center justify-center bg-black/20";
    loadingDiv.innerHTML = `
      <div style="background: white; padding: 40px 60px; border-radius: 12px; 
                  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                  text-align: center; border: 2px solid #3B82F6;">
        <div style="font-size: 28px; font-weight: 700; color: #1F2937; margin-bottom: 12px;">
          Creating Your PDF...
        </div>
        <div style="color: #6B7280; font-size: 16px; font-weight: 600;">
          Please wait a moment
        </div>
      </div>
    `;
    document.body.appendChild(loadingDiv);

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
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
          <div style="background: white; padding: 40px 60px; border-radius: 12px; 
                      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                      text-align: center; border: 2px solid #22C55E;">
            <div style="font-size: 40px; margin-bottom: 12px;">✓</div>
            <div style="font-size: 24px; font-weight: 700; color: #22C55E; margin-bottom: 8px;">
              PDF Downloaded!
            </div>
            <div style="color: #6B7280; font-size: 14px; font-weight: 600;">
              Check your downloads folder
            </div>
          </div>
        `;
        setTimeout(() => {
          document.body.removeChild(loadingDiv);
        }, 2000);
      }, 500);
    } catch (err) {
      console.error("PDF Error:", err);
      loadingDiv.innerHTML = `
        <div style="background: white; padding: 40px 60px; border-radius: 12px; 
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                    text-align: center; border: 2px solid #EF4444;">
          <div style="font-size: 40px; margin-bottom: 12px;">✕</div>
          <div style="font-size: 24px; font-weight: 700; color: #EF4444; margin-bottom: 8px;">
            Something went wrong
          </div>
          <div style="color: #6B7280; font-size: 14px; font-weight: 600;">
            Please try again
          </div>
        </div>
      `;
      setTimeout(() => {
        document.body.removeChild(loadingDiv);
      }, 3000);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📄</div>
          <div className="text-xl font-semibold text-gray-700">Loading test paper...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-blue-500">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={() => window.close()}
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 
                        border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>

            <div className="text-right">
              <h1 className="text-xl font-bold text-blue-700">
                {testData.subject} Test
              </h1>
              <p className="text-sm text-gray-600 font-medium">{testData.chapter}</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
            <div className="flex items-center gap-4">
              <div className={`px-5 py-2 rounded-lg border-3 font-bold ${
                timeRemaining < 60 ? 'border-red-500 bg-red-50 text-red-700' : 
                timeRemaining < 300 ? 'border-orange-500 bg-orange-50 text-orange-700' : 
                'border-green-500 bg-green-50 text-green-700'
              }`}>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-2xl font-mono">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>

              <span className="text-base font-semibold text-gray-700">
                ⏱️ {testData.duration} minutes
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={downloadAsPDF}
                disabled={isSubmitted || isTimeUp}
                className="px-5 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-lg 
                          hover:bg-blue-700 disabled:bg-gray-400 transition-colors
                          flex items-center gap-2 shadow-md"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitted || isTimeUp}
                className="px-5 py-2.5 text-sm font-bold bg-green-600 text-white rounded-lg 
                          hover:bg-green-700 disabled:bg-gray-400 transition-colors
                          flex items-center gap-2 shadow-md"
              >
                <CheckCircle className="w-4 h-4" />
                {isSubmitted ? "✓ Submitted" : "Submit Test"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div
          id="test-content"
          className="bg-white shadow-xl rounded-lg border-2 border-gray-300 p-10"
          style={{ minHeight: '297mm' }}
        >
          {/* Header */}
          <div className="mb-8 pb-6 border-b-3 border-blue-600">
            <div className="text-center mb-6">
              <div className="text-sm uppercase tracking-wider text-blue-600 font-bold mb-2">
                📝 Class 6 Test Paper
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {testData.subject}
              </h1>
              <h2 className="text-2xl text-gray-700 font-semibold">
                {testData.chapter}
              </h2>
            </div>

            {/* Student Info */}
            <div className="border-2 border-blue-300 bg-blue-50 rounded-lg p-5 mb-5">
              <div className="grid grid-cols-2 gap-4 text-base">
                <div className="flex items-center">
                  <span className="font-bold text-gray-800">Name:</span>
                  <span className="ml-2 border-b-2 border-dotted border-gray-500 flex-1 h-6"></span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-gray-800">Roll No:</span>
                  <span className="ml-2 border-b-2 border-dotted border-gray-500 flex-1 h-6"></span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-gray-800">Date:</span>
                  <span className="ml-2 font-semibold text-gray-700">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-gray-800">Time:</span>
                  <span className="ml-2 font-semibold text-gray-700">{testData.duration} minutes</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="border-2 border-yellow-400 bg-yellow-50 rounded-lg p-5">
              <p className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                📋 Instructions - Please Read Carefully!
              </p>
              <ul className="space-y-2 text-base text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold text-lg">1.</span>
                  <span className="font-medium">Read all questions carefully before you start writing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold text-lg">2.</span>
                  <span className="font-medium">Write your answers in clear, neat handwriting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold text-lg">3.</span>
                  <span className="font-medium">Show all your working and steps for math problems.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold text-lg">4.</span>
                  <span className="font-medium">Check the marks for each question - spend time wisely!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold text-lg">5.</span>
                  <span className="font-medium">Review your answers before submitting. You can do it! 💪</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Questions */}
          <div
            className="prose prose-lg max-w-none
                        prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-4 prose-headings:mt-8
                        prose-h3:text-2xl prose-h3:bg-blue-100 prose-h3:px-4 prose-h3:py-2 prose-h3:rounded-lg prose-h3:border-l-4 prose-h3:border-blue-600
                        prose-p:text-gray-800 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
                        prose-strong:text-blue-700 prose-strong:font-bold prose-strong:text-lg
                        prose-li:text-gray-800 prose-li:mb-4 prose-li:text-lg prose-li:leading-relaxed
                        prose-ol:space-y-6
                        prose-ul:space-y-3"
            dangerouslySetInnerHTML={{
              __html: marked.parse(testData.paper || ""),
            }}
          />

          {/* Answer Space Reminder */}
          <div className="mt-10 p-4 bg-green-50 border-2 border-green-400 rounded-lg">
            <p className="text-center text-green-800 font-bold text-lg">
              ✍️ Remember to leave proper space between your answers!
            </p>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t-2 border-gray-400 text-center">
            <p className="text-gray-600 font-semibold text-lg">🎓 End of Question Paper</p>
            <p className="text-gray-500 text-sm mt-2">Best of Luck! Do Your Best! 🌟</p>
          </div>
        </div>
      </div>

      {/* Time Up Modal */}
      <AnimatePresence>
        {isTimeUp && !isSubmitted && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-2xl border-4 border-red-500">
              <AlertCircle className="w-20 h-20 text-red-600 mx-auto mb-4" />
              
              <h2 className="text-4xl font-bold text-red-600 mb-4">
                ⏰ Time's Up!
              </h2>
              <p className="text-gray-700 text-lg mb-6 font-medium">
                Great job! Your time has ended. Please submit your test paper now.
              </p>

              <button
                onClick={handleSubmit}
                className="w-full px-6 py-4 bg-red-600 text-white font-bold text-lg rounded-xl 
                          hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <CheckCircle className="w-6 h-6" />
                Submit Test Paper
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-2xl border-4 border-green-500">
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
              
              <h2 className="text-4xl font-bold text-green-600 mb-4">
                🎉 Well Done!
              </h2>
              <p className="text-gray-700 text-lg mb-6 font-medium">
                Your test has been submitted successfully! Your PDF is downloading now.
              </p>

              <button
                onClick={() => window.close()}
                className="w-full px-6 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl 
                          hover:bg-blue-700 transition-colors shadow-lg"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TestPage;