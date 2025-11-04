import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ArrowLeft, Clock, Target, Calendar, BookOpen, Sparkles, CheckCircle2, Loader2 } from "lucide-react";

function ChapterWiseTest() {
  const navigate = useNavigate();
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Fetch chapter-wise tests from Convex
  const chapterTests = useQuery(api.test.getTestsByType, { 
    testType: "Chapter Wise" 
  });

  const gradients = [
    "from-blue-500 via-blue-600 to-indigo-600",
    "from-purple-500 via-purple-600 to-pink-600",
    "from-emerald-500 via-green-600 to-teal-600",
    "from-orange-500 via-amber-600 to-yellow-600",
    "from-rose-500 via-red-600 to-pink-600",
    "from-cyan-500 via-sky-600 to-blue-600",
  ];

  // Map tests to chapters with gradients
  const chapters = chapterTests?.map((test, index) => ({
    id: test._id,
    name: test.title,
    description: test.subject,
    driveLink: test.driveLink,
    duration: test.duration,
    totalMarks: test.totalMarks,
    date: test.date,
    time: test.time,
    gradient: gradients[index % gradients.length]
  })) || [];

 const handleStartTest = () => {
  if (!selectedChapter) return;
  
  if (!selectedChapter.driveLink) {
    alert("No Drive link available for this test.");
    return;
  }
  
  // Create URL with test parameters
  const testParams = new URLSearchParams({
    name: selectedChapter.name,
    duration: selectedChapter.duration || 60,
    pdf: selectedChapter.driveLink,
    marks: selectedChapter.totalMarks || 100,
    date: selectedChapter.date || '',
    time: selectedChapter.time || ''
  });
  
  // Open test window in a new popup with specific dimensions
  const testWindowUrl = `/test-window?${testParams.toString()}`;
  const windowFeatures = "width=1400,height=900,left=100,top=50,resizable=yes,scrollbars=yes";
  window.open(testWindowUrl, "_blank", windowFeatures);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Image Layer */}
<div 
  className="fixed inset-0 bg-[url('/test.jpg')] bg-cover bg-center opacity-30 pointer-events-none z-0"
></div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="cursor-pointer group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm">Back</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Chapter-wise Test
              </h2>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-4">
           
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
              Chapter-wise Test
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
         Let's assess your knowledge and challenge yourself with a chapter-wise test.
            </p>
          </div>

          {/* Loading State */}
          {!chapterTests && (
            <div className="text-center py-32">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
                <p className="text-gray-700 font-medium">Loading amazing chapters...</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {chapterTests && chapters.length === 0 && (
            <div className="text-center py-32">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-md mx-auto border border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No Chapters Yet</h3>
                <p className="text-gray-600 mb-2">Chapter-wise tests haven't been added yet</p>
                <p className="text-sm text-gray-500">Check back soon or contact your teacher</p>
              </div>
            </div>
          )}

          {/* Chapters Grid */}
          {chapters && chapters.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {chapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    onClick={() => setSelectedChapter(chapter)}
                    className={`group cursor-pointer bg-white rounded-3xl shadow-lg border-2 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:-translate-y-2 ${
                      selectedChapter?.id === chapter.id
                        ? "border-green-500 ring-4 ring-green-200 scale-105"
                        : "border-transparent hover:border-gray-200"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Gradient Header */}
                    <div className={`relative h-32 bg-gradient-to-br ${chapter.gradient} overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute top-4 right-4">
                        {selectedChapter?.id === chapter.id && (
                          <div className="bg-white rounded-full p-2 shadow-lg animate-bounce">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white/20 text-8xl font-black">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {chapter.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                        {chapter.description}
                      </p>

                      {/* Info Pills */}
                      <div className="space-y-3">
                        {chapter.duration && (
                          <div className="flex items-center gap-3 px-4 py-2.5 bg-blue-50 rounded-xl border border-blue-100">
                            <div className="p-1.5 bg-blue-100 rounded-lg">
                              <Clock className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-blue-600 font-medium">Duration</p>
                              <p className="text-sm font-bold text-blue-900">{chapter.duration} mins</p>
                            </div>
                          </div>
                        )}

                        {chapter.totalMarks && (
                          <div className="flex items-center gap-3 px-4 py-2.5 bg-purple-50 rounded-xl border border-purple-100">
                            <div className="p-1.5 bg-purple-100 rounded-lg">
                              <Target className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-purple-600 font-medium">Total Marks</p>
                              <p className="text-sm font-bold text-purple-900">{chapter.totalMarks} points</p>
                            </div>
                          </div>
                        )}

                        {chapter.date && (
                          <div className="flex items-center gap-3 px-4 py-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                            <div className="p-1.5 bg-emerald-100 rounded-lg">
                              <Calendar className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-emerald-600 font-medium">Scheduled</p>
                              <p className="text-sm font-bold text-emerald-900">{chapter.date}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${chapter.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
                  </div>
                ))}
              </div>

              {/* Start Button */}
<div className="text-center">
  <button
    onClick={handleStartTest}
    disabled={!selectedChapter}
    className={`group relative px-12 py-5 rounded-2xl text-white font-bold text-lg transition-all duration-300 ${
      selectedChapter
        ? "bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 hover:shadow-2xl hover:scale-105 cursor-pointer"
        : "bg-gray-300 cursor-not-allowed"
    }`}
  >
    <span className="relative z-10 flex items-center gap-3">
      {selectedChapter ? (
        <>
          <Sparkles className="w-5 h-5" />
          Open Test: {selectedChapter.name}
          <ArrowLeft className="w-5 h-5 rotate-180 transition-transform group-hover:translate-x-1" />
        </>
      ) : (
        "Select a Chapter First"
      )}
    </span>
    {selectedChapter && (
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
    )}
  </button>
</div>

            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default ChapterWiseTest;