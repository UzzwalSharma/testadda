import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TestsSection() {
  const [selectedTest, setSelectedTest] = useState(null);
  const navigate = useNavigate();

  const testTypes = [
    {
      id: 1,
      title: "MCQ Test",
      description: "Multiple choice questions to test your knowledge",
      imageUrl: "/ad.gif",
      color: "bg-blue-600 hover:bg-blue-700",
      isLocked: true,
      route: "/mcq-test"
    },
    {
      id: 2,
      title: "AI Competitor",
      description: "Challenge AI and prove your concept mastery",
      imageUrl: "/META.gif",
      color: "bg-purple-600 hover:bg-purple-700",
      isLocked: true,
      route: "/ai-test"
    },
    {
      id: 3,
      title: "Chapter-wise Test",
      description: "Practice specific chapters at your own pace",
      imageUrl: "/full.gif",
      color: "bg-green-600 hover:bg-green-700",
      isLocked: false,
      route: "/chapterwisetest"
    }
  ];

  const handleTestClick = (test) => {
    if (!test.isLocked) {
      setSelectedTest(test.id);
      navigate(test.route);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm">Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Revision Tests Section
          </h1>
          <p className="text-gray-600 text-lg">
            Tests are important to help you understand the concepts better. Always remember that the best way to learn is by practice.
          </p>
        </div>
      </div>

      {/* Test Types Grid */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testTypes.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 transform hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative h-52 bg-gray-100 overflow-hidden">
                <img
                  src={test.imageUrl}
                  alt={test.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {test.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {test.description}
                </p>

                {/* Button */}
                <button
                  className={`w-full ${test.color} text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    test.isLocked ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleTestClick(test)}
                  disabled={test.isLocked}
                >
                  {test.isLocked && (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span>{test.isLocked ? "Locked" : "Start Test"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestsSection;
