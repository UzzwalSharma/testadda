import React, { useState, useEffect, useRef } from 'react';
import { Clock, AlertTriangle, Eye, FileText, CheckCircle, XCircle, ChevronUp, ChevronDown } from 'lucide-react';

export default function MobileTestWindow() {
  // Get test data from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const testName = urlParams.get('name') || 'Chapter Test';
  const duration = parseInt(urlParams.get('duration')) || 60;
  const pdfUrl = urlParams.get('pdf') || '';
  const totalMarks = urlParams.get('marks') || '100';

  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [warnings, setWarnings] = useState([]);
  const [testStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const containerRef = useRef(null);

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer countdown
  useEffect(() => {
    if (!testStarted || testEnded) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTestEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testEnded]);

  // Detect tab switches and visibility changes
  useEffect(() => {
    if (!testStarted || testEnded) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches((prev) => prev + 1);
        const timestamp = new Date().toLocaleTimeString();
        setWarnings((prev) => [
          ...prev,
          { time: timestamp, message: 'App switched or screen locked' }
        ]);
      }
    };

    const handleBlur = () => {
      if (testStarted && !testEnded) {
        const timestamp = new Date().toLocaleTimeString();
        setWarnings((prev) => [
          ...prev,
          { time: timestamp, message: 'Focus lost from test window' }
        ]);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [testStarted, testEnded]);

  // Start test
  const handleStartTest = () => {
    setTestStarted(true);
  };

  // End test
  const handleEndTest = () => {
    setTestEnded(true);
  };

  // Get color based on time remaining
  const getTimerColor = () => {
    const percentage = (timeRemaining / (duration * 60)) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Pre-test instructions screen
  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{testName}</h1>
                <p className="text-blue-100 text-sm">Online Assessment</p>
              </div>
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{duration} mins</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>{totalMarks} Marks</span>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Instructions
              </h2>
              <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">1</div>
                  <p>Test runs in fullscreen. Do not exit fullscreen.</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">2</div>
                  <p>Do not switch apps. All switches are tracked.</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">3</div>
                  <p>Timer runs continuously and cannot be paused.</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">4</div>
                  <p>Test auto-submits when time expires.</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">5</div>
                  <p>Keep stable internet connection throughout.</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">6</div>
                  <p>No unauthorized materials or assistance.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-900 text-sm mb-1">Academic Integrity</h3>
                  <p className="text-xs text-amber-800">
                    By starting, you agree to maintain integrity. Violations will be reported.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartTest}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Post-test results screen
  if (testEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full bg-white rounded-2xl shadow-2xl p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Test Completed</h2>
            <p className="text-gray-600 text-sm">Successfully submitted</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">Summary</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Test:</span>
                <span className="font-semibold text-gray-800">{testName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold text-gray-800">{duration} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">App Switches:</span>
                <span className={`font-semibold ${tabSwitches > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {tabSwitches}
                </span>
              </div>
            </div>
          </div>

          {warnings.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-red-800 mb-2 text-sm flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                Violations ({warnings.length})
              </h3>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {warnings.map((warning, index) => (
                  <div key={index} className="text-xs text-red-700">
                    <span className="font-medium">{warning.time}:</span> {warning.message}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => window.close()}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Active test screen
  return (
    <div ref={containerRef} className="h-screen bg-gray-50 flex flex-col">
      {/* Header with Timer */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <FileText className="w-4 h-4 flex-shrink-0" />
            <h2 className="text-sm font-bold truncate">{testName}</h2>
          </div>
          <button
            onClick={() => setBottomSheetOpen(!bottomSheetOpen)}
            className="ml-2 p-1 hover:bg-white/20 rounded"
          >
            {bottomSheetOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className={`text-2xl font-bold ${getTimerColor()}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          <div className="text-xs opacity-90">{totalMarks} Marks</div>
        </div>
        <div className="mt-2 bg-white/20 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-white to-blue-200 transition-all duration-1000"
            style={{ width: `${(timeRemaining / (duration * 60)) * 100}%` }}
          />
        </div>
      </div>

      {/* PDF Content Area */}
      <div className="flex-1 overflow-hidden bg-white">
        {pdfUrl ? (
          <iframe
            src={pdfUrl.includes('/view') 
              ? pdfUrl.replace('/view', '/preview')
              : pdfUrl.includes('/file/d/')
              ? `https://drive.google.com/file/d/${pdfUrl.split('/file/d/')[1].split('/')[0]}/preview`
              : pdfUrl
            }
            className="w-full h-full"
            title="Test PDF"
            allow="autoplay"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center p-6">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-base font-medium">No PDF available</p>
              <p className="text-xs mt-1">Contact your instructor</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sheet - Monitoring Info & Controls */}
      {bottomSheetOpen && (
        <div className="bg-white border-t border-gray-200 p-4 max-h-72 overflow-y-auto">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-gray-800">Monitoring</span>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-700">App Switches</span>
                <span className={`font-bold text-lg ${tabSwitches > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {tabSwitches}
                </span>
              </div>
            </div>
          </div>

          {warnings.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-bold text-gray-800">Violations ({warnings.length})</span>
              </div>
              <div className="space-y-1">
                {warnings.slice(-3).reverse().map((warning, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded p-2">
                    <div className="text-red-700 text-xs font-medium">{warning.time}</div>
                    <div className="text-red-600 text-xs">{warning.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleEndTest}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-2 rounded-lg text-sm hover:from-red-600 hover:to-red-700"
          >
            End Test & Submit
          </button>
        </div>
      )}

      {/* Floating Action Button (if bottom sheet not open) */}
      {!bottomSheetOpen && (
        <div className="fixed bottom-4 right-4 z-20">
          <button
            onClick={handleEndTest}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full p-3 shadow-lg hover:from-red-600 hover:to-red-700 active:scale-95 transition-all"
            title="End Test"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}