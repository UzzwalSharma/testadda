import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Trash2,
  Plus,
  Palette,
  ExternalLink,
  BookOpen,
  Calendar,
  Users,
  Menu,
} from "lucide-react";

import toast, { Toaster } from "react-hot-toast";
import TeacherWelcomeCard from "./Welcome";
import TestsSection from "./TestsSection";

function AdminPanel() {
  const addWorksheetSubmission = useMutation(
    api.addworksheet.addWorksheetSubmission
  );
  const addTestSubmission = useMutation(api.addtest.addTestSubmission);

  // Add state for submission forms
  const [submissionType, setSubmissionType] = useState("worksheet");
  const [worksheetSubmissionForm, setWorksheetSubmissionForm] = useState({
    studentName: "",
    worksheetName: "",
    marks: "",
    timelySubmission: true,
  });

  const [testSubmissionForm, setTestSubmissionForm] = useState({
    studentName: "",
    testName: "",
    marks: "",
    timelySubmission: true,
  });

  // Add handlers
  const handleWorksheetSubmissionAdd = async (e) => {
    e.preventDefault();
    if (
      !worksheetSubmissionForm.studentName ||
      !worksheetSubmissionForm.worksheetName ||
      !worksheetSubmissionForm.marks
    ) {
      toast.error("Please fill all fields!");
      return;
    }
    try {
      await addWorksheetSubmission({
        ...worksheetSubmissionForm,
        marks: Number(worksheetSubmissionForm.marks),
        submittedAt: new Date().toISOString(),
      });
      toast.success("Worksheet submission added! 📝");
      setWorksheetSubmissionForm({
        studentName: "",
        worksheetName: "",
        marks: "",
        timelySubmission: true,
      });
    } catch (error) {
      toast.error("Failed to add submission");
    }
  };

  const handleTestSubmissionAdd = async (e) => {
    e.preventDefault();
    if (
      !testSubmissionForm.studentName ||
      !testSubmissionForm.testName ||
      !testSubmissionForm.marks
    ) {
      toast.error("Please fill all fields!");
      return;
    }
    try {
      await addTestSubmission({
        ...testSubmissionForm,
        marks: Number(testSubmissionForm.marks),
        submittedAt: new Date().toISOString(),
      });
      toast.success("Test submission added! 📝");
      setTestSubmissionForm({
        studentName: "",
        testName: "",
        marks: "",
        timelySubmission: true,
      });
    } catch (error) {
      toast.error("Failed to add submission");
    }
  };

  const addWorksheet = useMutation(api.worksheets.add);
  const deleteWorksheet = useMutation(api.worksheets.remove);
  const worksheets = useQuery(api.worksheets.getAll) || [];

  const [activeTab, setActiveTab] = useState("worksheets");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [form, setForm] = useState({
    subject: "",
    chapter: "",
    color: "from-blue-500 to-blue-600",
    imageUrl: "",
    description: "",
    driveLink: "",
    pages: "",
    difficulty: "Easy",
  });

  const [testForm, setTestForm] = useState({
    title: "",
    subject: "",
    date: "",
    time: "",
    duration: "",
    totalMarks: "",
  });

  const [showColorPicker, setShowColorPicker] = useState(false);

  const mockTests = [
    {
      id: 1,
      title: "Algebra Test",
      subject: "Mathematics",
      date: "2025-10-25",
      time: "10:00 AM",
      duration: "90",
      enrolled: 24,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Chemistry Quiz",
      subject: "Chemistry",
      date: "2025-10-22",
      time: "02:00 PM",
      duration: "60",
      enrolled: 18,
      status: "upcoming",
    },
  ];

  const mockStudents = [
    {
      id: 1,
      name: "Aarav Sharma",
      avatar: "AS",
      worksheet: "Algebra Basics",
      action: "submitted",
      time: "2 hours ago",
      score: 95,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Priya Patel",
      avatar: "PP",
      worksheet: "Calculus",
      action: "downloaded",
      time: "3 hours ago",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "Rohan Kumar",
      avatar: "RK",
      worksheet: "Trigonometry",
      action: "submitted",
      time: "5 hours ago",
      score: 88,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const colorOptions = [
    { name: "Ocean", value: "from-blue-500 to-blue-600" },
    { name: "Purple", value: "from-purple-500 to-purple-600" },
    { name: "Rose", value: "from-pink-500 to-pink-600" },
    { name: "Emerald", value: "from-green-500 to-green-600" },
    { name: "Sunset", value: "from-orange-500 to-orange-600" },
    { name: "Ruby", value: "from-red-500 to-red-600" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject || !form.chapter || !form.driveLink) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      await addWorksheet({ ...form, pages: Number(form.pages) });
      toast.success("Worksheet added successfully! 🎉");
      setForm({
        subject: "",
        chapter: "",
        color: "from-blue-500 to-blue-600",
        imageUrl: "",
        description: "",
        driveLink: "",
        pages: "",
        date: "",
        difficulty: "Easy",
      });
    } catch (error) {
      toast.error("Failed to add worksheet");
    }
  };

  const handleTestSubmit = (e) => {
    e.preventDefault();
    toast.success("Test scheduled successfully! 🎉");
    setTestForm({
      title: "",
      subject: "",
      date: "",
      time: "",
      duration: "",
      totalMarks: "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this worksheet?")) {
      try {
        await deleteWorksheet({ id });
        toast.success("Worksheet deleted!");
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  const stats = {
    worksheets: worksheets.length,
    tests: mockTests.length,
    students: 45,
    submissions: mockStudents.filter((s) => s.action === "submitted").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-yellow-200 rounded-md border-r border-gray-100 transition-all duration-300 fixed h-screen z-50`}
      >
        <div className="p-5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-10 p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {sidebarOpen && (
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-gray-900 mb-0.5">
                Drashti Mam's
              </h2>
              <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
          )}

          <nav className="space-y-2">
            {[
              { id: "worksheets", icon: BookOpen, label: "Worksheets" },
              { id: "tests", icon: Calendar, label: "Tests" },
              { id: "students", icon: Users, label: "Activity" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-pink-400 to-red-500 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon size={20} />
                {sidebarOpen && (
                  <span className="font-medium text-sm">{tab.label}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen`}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          <TeacherWelcomeCard />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Worksheets", value: stats.worksheets },
              { label: "Tests", value: stats.tests },
              { label: "Students", value: stats.students },
              { label: "Submissions", value: stats.submissions },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-sm transition-shadow"
              >
                <div className="text-3xl font-semibold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Worksheets */}

          {activeTab === "worksheets" && (
            <div className="space-y-8">
              {/* Create Worksheet Form */}
              <div className="bg-white rounded-lg p-8 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Create Worksheet
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      placeholder="Mathematics, Physics..."
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chapter *
                    </label>
                    <input
                      placeholder="Algebra, Calculus..."
                      value={form.chapter}
                      onChange={(e) =>
                        setForm({ ...form, chapter: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="Enter image URL (e.g. https://...)"
                      value={form.imageUrl || ""}
                      onChange={(e) =>
                        setForm({ ...form, imageUrl: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    />
                    {form.imageUrl && (
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="mt-3 w-16 h-16 object-contain rounded-lg border border-gray-200"
                      />
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-md bg-gradient-to-r ${form.color}`}
                        ></div>
                        <span className="text-sm text-gray-700">
                          {
                            colorOptions.find((c) => c.value === form.color)
                              ?.name
                          }
                        </span>
                      </div>
                      <Palette size={16} className="text-gray-400" />
                    </button>
                    {showColorPicker && (
                      <div className="absolute z-40 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-full">
                        <div className="grid grid-cols-3 gap-3">
                          {colorOptions.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => {
                                setForm({ ...form, color: color.value });
                                setShowColorPicker(false);
                              }}
                              className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div
                                className={`w-12 h-12 rounded-md bg-gradient-to-r ${color.value}`}
                              ></div>
                              <span className="text-xs text-gray-600">
                                {color.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pages
                    </label>
                    <input
                      type="number"
                      placeholder="5"
                      value={form.pages}
                      onChange={(e) =>
                        setForm({ ...form, pages: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={form.difficulty}
                      onChange={(e) =>
                        setForm({ ...form, difficulty: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Submission *
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
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
                      value={form.driveLink}
                      onChange={(e) =>
                        setForm({ ...form, driveLink: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Brief description..."
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      rows="3"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  <Plus size={18} /> Add Worksheet
                </button>
              </div>

              {/* All Worksheets */}
              <div className="bg-white rounded-lg p-8 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  All Worksheets
                </h2>
                {worksheets.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-5xl mb-3">📚</div>
                    <p className="text-gray-400">No worksheets yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {worksheets.map((w) => (
                      <div
                        key={w._id}
                        className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div
                          className={`bg-gradient-to-br ${w.color} p-6 text-white text-center`}
                        >
                          <div className="text-4xl mb-2">{w.icon}</div>
                          <h3 className="font-semibold text-lg mb-1">
                            {w.chapter}
                          </h3>
                          <p className="text-sm opacity-90">{w.subject}</p>
                        </div>
                        <div className="p-5">
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {w.description || "No description"}
                          </p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="text-lg">📄</span>
                              <span>{w.pages} pages</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-lg">⚙️</span>
                              <span
                                className={`font-medium px-2.5 py-0.5 rounded-md text-xs ${
                                  w.difficulty === "Easy"
                                    ? "bg-green-50 text-green-700"
                                    : w.difficulty === "Medium"
                                      ? "bg-yellow-50 text-yellow-700"
                                      : "bg-red-50 text-red-700"
                                }`}
                              >
                                {w.difficulty}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <a
                              href={w.driveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors inline-flex items-center gap-2"
                            >
                              Open <ExternalLink size={14} />
                            </a>
                            <button
                              onClick={() => handleDelete(w._id)}
                              className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {/* tests */}
          {activeTab === "tests" && <TestsSection />}

          {/* student activity */}

          {activeTab === "students" && (
            <div className="space-y-8">
              {/* Add Submission Form */}
              <div className="bg-white rounded-lg p-8 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Add Submission
                </h2>

                {/* Toggle between worksheet and test */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setSubmissionType("worksheet")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      submissionType === "worksheet"
                        ? "bg-gradient-to-r from-pink-400 to-red-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Worksheet Submission
                  </button>
                  <button
                    onClick={() => setSubmissionType("test")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      submissionType === "test"
                        ? "bg-gradient-to-r from-pink-400 to-red-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Test Submission
                  </button>
                </div>

                {submissionType === "worksheet" ? (
                  <form onSubmit={handleWorksheetSubmissionAdd}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student Name *
                        </label>
                        <input
                          placeholder="Enter student name"
                          value={worksheetSubmissionForm.studentName}
                          onChange={(e) =>
                            setWorksheetSubmissionForm({
                              ...worksheetSubmissionForm,
                              studentName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Worksheet Name *
                        </label>
                        <input
                          placeholder="Enter worksheet name"
                          value={worksheetSubmissionForm.worksheetName}
                          onChange={(e) =>
                            setWorksheetSubmissionForm({
                              ...worksheetSubmissionForm,
                              worksheetName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Marks *
                        </label>
                        <input
                          type="number"
                          placeholder="Enter marks"
                          value={worksheetSubmissionForm.marks}
                          onChange={(e) =>
                            setWorksheetSubmissionForm({
                              ...worksheetSubmissionForm,
                              marks: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Submission Status
                        </label>
                        <select
                          value={worksheetSubmissionForm.timelySubmission.toString()}
                          onChange={(e) =>
                            setWorksheetSubmissionForm({
                              ...worksheetSubmissionForm,
                              timelySubmission: e.target.value === "true",
                            })
                          }
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="true">On Time</option>
                          <option value="false">Late</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
                    >
                      <Plus size={18} /> Add Worksheet Submission
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleTestSubmissionAdd}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student Name *
                        </label>
                        <input
                          placeholder="Enter student name"
                          value={testSubmissionForm.studentName}
                          onChange={(e) =>
                            setTestSubmissionForm({
                              ...testSubmissionForm,
                              studentName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Test Name *
                        </label>
                        <input
                          placeholder="Enter test name"
                          value={testSubmissionForm.testName}
                          onChange={(e) =>
                            setTestSubmissionForm({
                              ...testSubmissionForm,
                              testName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Marks *
                        </label>
                        <input
                          type="number"
                          placeholder="Enter marks"
                          value={testSubmissionForm.marks}
                          onChange={(e) =>
                            setTestSubmissionForm({
                              ...testSubmissionForm,
                              marks: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Submission Status
                        </label>
                        <select
                          value={testSubmissionForm.timelySubmission.toString()}
                          onChange={(e) =>
                            setTestSubmissionForm({
                              ...testSubmissionForm,
                              timelySubmission: e.target.value === "true",
                            })
                          }
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="true">On Time</option>
                          <option value="false">Late</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
                    >
                      <Plus size={18} /> Add Test Submission
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
