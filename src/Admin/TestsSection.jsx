import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Trash2,
  Plus,
  Calendar,
  Clock,
  BookOpen,
  Award,
  ExternalLink,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function TestsSection() {
  const addTest = useMutation(api.test.addTest);
  const deleteTest = useMutation(api.test.removeTest);
  const tests = useQuery(api.test.getAllTests) || [];

  const [testForm, setTestForm] = useState({
    title: "",
    subject: "",
    date: "",
    time: "",
    duration: "",
    totalMarks: "",
    driveLink: "",
    testType: "MCQ",
  });

  const [chapterForm, setChapterForm] = useState({
    name: "",
    description: "",
  });

  const [chapters, setChapters] = useState([]);
  const [showChapterForm, setShowChapterForm] = useState(false);

  const handleTestSubmit = async (e) => {
    e.preventDefault();
    
    if (!testForm.title || !testForm.subject || !testForm.date || !testForm.driveLink) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      await addTest({
        ...testForm,
      });
      toast.success("Test scheduled successfully! 🎉");
      setTestForm({
        title: "",
        subject: "",
        date: "",
        time: "",
        duration: "",
        totalMarks: "",
        driveLink: "",
        testType: "MCQ",
      });
    } catch (error) {
      toast.error("Failed to schedule test");
    }
  };

  const handleAddChapter = (e) => {
    e.preventDefault();
    if (!chapterForm.name || !chapterForm.description) {
      toast.error("Please fill chapter name and description!");
      return;
    }
    
    setChapters([...chapters, { id: Date.now(), ...chapterForm }]);
    toast.success("Chapter added! 📚");
    setChapterForm({ name: "", description: "" });
    setShowChapterForm(false);
  };

  const handleDeleteChapter = (id) => {
    setChapters(chapters.filter(ch => ch.id !== id));
    toast.success("Chapter removed!");
  };

  const handleDeleteTest = async (id) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      try {
        await deleteTest({ id });
        toast.success("Test deleted!");
      } catch (error) {
        toast.error("Failed to delete test");
      }
    }
  };

  const getTestTypeColor = (type) => {
    switch (type) {
      case "MCQ":
        return "bg-blue-50 text-blue-700";
      case "AI":
        return "bg-purple-50 text-purple-700";
      case "Chapter Wise":
        return "bg-green-50 text-green-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      <Toaster position="top-right" />

      {/* Schedule Test Form */}
      <div className="bg-white rounded-lg p-8 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Schedule Test
        </h2>
        <form onSubmit={handleTestSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Title *
              </label>
              <input
                placeholder="Mid-term Examination"
                value={testForm.title}
                onChange={(e) =>
                  setTestForm({ ...testForm, title: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Type *
              </label>
              <select
                value={testForm.testType}
                onChange={(e) =>
                  setTestForm({ ...testForm, testType: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="MCQ">MCQ Test</option>
                <option value="AI">AI Evaluated Test</option>
                <option value="Chapter Wise">Chapter Wise Test</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                placeholder="Mathematics"
                value={testForm.subject}
                onChange={(e) =>
                  setTestForm({ ...testForm, subject: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                value={testForm.date}
                onChange={(e) =>
                  setTestForm({ ...testForm, date: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                value={testForm.time}
                onChange={(e) =>
                  setTestForm({ ...testForm, time: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (mins)
              </label>
              <input
                type="number"
                placeholder="90"
                value={testForm.duration}
                onChange={(e) =>
                  setTestForm({ ...testForm, duration: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Marks
              </label>
              <input
                type="number"
                placeholder="100"
                value={testForm.totalMarks}
                onChange={(e) =>
                  setTestForm({ ...testForm, totalMarks: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Drive Link *
              </label>
              <input
                placeholder="https://drive.google.com/..."
                value={testForm.driveLink}
                onChange={(e) =>
                  setTestForm({ ...testForm, driveLink: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
          >
            <Calendar size={18} /> Schedule Test
          </button>
        </form>
      </div>

      {/* Chapter-wise Configuration (only shown when Chapter Wise is selected) */}
      {testForm.testType === "Chapter Wise" && (
        <div className="bg-white rounded-lg p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Chapter Configuration
            </h2>
            <button
              onClick={() => setShowChapterForm(!showChapterForm)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
            >
              <Plus size={16} /> Add Chapter
            </button>
          </div>

          {/* Chapter Form */}
          {showChapterForm && (
            <form onSubmit={handleAddChapter} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chapter Name
                  </label>
                  <input
                    placeholder="Introduction to Programming"
                    value={chapterForm.name}
                    onChange={(e) =>
                      setChapterForm({ ...chapterForm, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    placeholder="Basics of programming, flowcharts..."
                    value={chapterForm.description}
                    onChange={(e) =>
                      setChapterForm({ ...chapterForm, description: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Add Chapter
              </button>
            </form>
          )}

          {/* Chapters Grid */}
          {chapters.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400">No chapters added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {chapter.name}
                    </h3>
                    <button
                      onClick={() => handleDeleteChapter(chapter.id)}
                      className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {chapter.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* All Scheduled Tests */}
      <div className="bg-white rounded-lg p-8 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          All Scheduled Tests
        </h2>
        {tests.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-3">📝</div>
            <p className="text-gray-400">No tests scheduled yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tests.map((test) => (
              <div
                key={test._id}
                className="bg-white border border-gray-100 rounded-lg p-6 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {test.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{test.subject}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-medium ${getTestTypeColor(test.testType)}`}
                    >
                      {test.testType}
                    </span>
                    <button
                      onClick={() => handleDeleteTest(test._id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Date
                    </div>
                    <div className="font-medium text-gray-900 text-sm">
                      {test.date}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Clock size={12} /> Time
                    </div>
                    <div className="font-medium text-gray-900 text-sm">
                      {test.time || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Clock size={12} /> Duration
                    </div>
                    <div className="font-medium text-gray-900 text-sm">
                      {test.duration ? `${test.duration} mins` : "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Award size={12} /> Marks
                    </div>
                    <div className="font-medium text-gray-900 text-sm">
                      {test.totalMarks || "N/A"}
                    </div>
                  </div>
                </div>
                <a
                  href={test.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  Open Test Link <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TestsSection;