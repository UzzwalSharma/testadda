import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
function DownloadWorksheetsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const worksheets = useQuery(api.worksheets.getAll) || null;

  const filteredWorksheets =
    worksheets?.filter(
      (w) =>
        w.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.chapter.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleDownload = (driveLink) => {
    window.open(driveLink, "_blank");
  };

  return (
    <div className="relative min-h-screen px-6 sm:px-10 py-16 overflow-hidden">
        {/* Back Arrow */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-20 group flex items-center gap-2 bg-yellow-300 backdrop-blur-md hover:bg-yellow-400 px-4 py-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <svg 
          className="w-6 h-6  group-hover:-translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-bold text-sm">Back</span>
      </Link>
      {/* Background Image */}
      <img
        src="/bg.jpeg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30 -z-10"
      />

      {/* Floating Kid Illustration */}
      <img
        src="/kid.png"
        alt="Student Illustration"
        className="hidden md:block absolute right-10 bottom-0 w-72 sm:w-80 lg:w-96 object-contain translate-y-10"
      />

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12 text-center relative z-10">
        <h1 className="text-5xl font-extrabold mb-3 text-black">
          Download Worksheets
        </h1>
        <p className="text-gray-600 text-lg">
          Practice makes perfect — pick a worksheet and get started!
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12 relative z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by subject or chapter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 text-base rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none shadow-sm bg-white transition-all duration-200"
          />
          <svg
            className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Worksheets Section */}
      <div className="max-w-7xl mx-auto relative z-10">
        {!worksheets ? (
          // 🌀 Loader while fetching
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            {/* Spinner */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-blue-300 border-t-blue-600 animate-spin"></div>
             
            </div>

            {/* Shimmer Text */}
            <h3 className="text-2xl font-semibold  animate-pulse bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Loading Worksheets...
            </h3>
            <p className="text-gray-500 text-sm">
              Please wait while we fetch the content 📚
            </p>
          </div>
        ) : filteredWorksheets.length === 0 ? (
          // 😔 Empty state (no data or no match)
          <div className="flex flex-col items-center justify-center py-24">
            <div className="rounded-2xl shadow-sm p-10 max-w-md text-center bg-white/70 backdrop-blur-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {searchQuery
                  ? `No results for “${searchQuery}”`
                  : "No worksheets available yet"}
              </h3>
              <p className="text-gray-500 text-sm">
                Try another keyword or check back later!
              </p>
            </div>
          </div>
        ) : (
          // ✅ Show worksheets
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorksheets.map((worksheet) => (
              <div
                key={worksheet._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Card Header */}
                <div
                  className={`bg-gradient-to-r ${worksheet.color} p-5 text-white text-center relative rounded-t-xl`}
                >
      {worksheet.imageUrl && (
  <img
    src={worksheet.imageUrl}
    alt={worksheet.chapter}
    className="w-16 h-16 mx-auto mb-2 object-contain rounded-lg"
  />
)}


                  <h3 className="text-xl font-semibold">{worksheet.chapter}</h3>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {worksheet.subject}
                    </span>
                    <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      {worksheet.pages} pages
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {worksheet.description}
                  </p>
<p className="text-sm text-gray-500 outfit">
  Submission date:{" "}
  {new Date(worksheet.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })}
</p>



                  <button
                    onClick={() => handleDownload(worksheet.driveLink)}
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DownloadWorksheetsSection;
