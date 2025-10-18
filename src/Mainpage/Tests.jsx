import React, { useState } from "react";

function TestsSection() {
  const [selectedTest, setSelectedTest] = useState(null);

  const testTypes = [
    {
      id: 1,
      title: "MCQ Test",
      description: "Multiple choice questions to test your knowledge",
      imageUrl: "/ad.gif",
      color: "bg-blue-600 hover:bg-blue-700",
      isLocked: true
    },
    {
      id: 2,
      title: "AI Competitor",
      description: "Challenge AI and prove your concept mastery",
      imageUrl: "/META.gif",
      color: "bg-purple-600 hover:bg-purple-700",
      isLocked: true
    },
    {
      id: 3,
      title: "Chapter-wise Test",
      description: "Practice specific chapters at your own pace",
      imageUrl: "/full.gif",
      color: "bg-green-600 hover:bg-green-700",
      isLocked: true
    }
  ];

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
          Tests are important to help you understand the concepts better. always remember that the best way to learn is by practice. 
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
                  className={`w-full ${test.color} text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${test.isLocked ? 'opacity-70 cursor-not-allowed' : ''}`}
                  onClick={() => !test.isLocked && setSelectedTest(test.id)}
                  disabled={test.isLocked}
                >
                  {test.isLocked && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{test.isLocked ? 'Locked' : 'Start Test'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice Section */}
      <div className="max-w-6xl mx-auto ">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-sm shadow-sm">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                No Tests Scheduled
              </h3>
              <p className="text-yellow-700">
                There are no test schedules available right now. Check back later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestsSection;