import React, { useState, useEffect, useRef } from 'react';
import { Clock, AlertTriangle, Eye, EyeOff, FileText, CheckCircle, XCircle } from 'lucide-react';

export default function TestWindow() {
  // Get test data from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const testName = urlParams.get('name') || 'Chapter Test';
  const duration = parseInt(urlParams.get('duration')) || 60;
  const pdfUrl = urlParams.get('pdf') || '';
  const totalMarks = urlParams.get('marks') || '100';

  const [timeRemaining, setTimeRemaining] = useState(duration * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(true);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [warnings, setWarnings] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
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
          { time: timestamp, message: 'Tab switched or window minimized' }
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

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Start test
  const handleStartTest = () => {
    setTestStarted(true);
    toggleFullscreen();
  };

  // End test
  const handleEndTest = () => {
    setTestEnded(true);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{testName}</h1>
                <p className="text-blue-100">Online Assessment</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Duration: {duration} mins</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Total Marks: {totalMarks}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                Important Instructions
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
                  <p>This test will open in <strong>fullscreen mode</strong>. Do not exit fullscreen during the test.</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">2</div>
                  <p><strong>Do NOT switch tabs</strong> or minimize the window. All switches are tracked and recorded.</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">3</div>
                  <p>The timer will run continuously. Once started, it <strong>cannot be paused</strong>.</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">4</div>
                  <p>The test will <strong>auto-submit</strong> when time expires.</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">5</div>
                  <p>Ensure you have a <strong>stable internet connection</strong> throughout the test.</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">6</div>
                  <p>Use of unauthorized materials or assistance is <strong>strictly prohibited</strong>.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-8">
              <div className="flex gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-2">Academic Integrity Warning</h3>
                  <p className="text-sm text-amber-800">
                    By starting this test, you agree to maintain academic integrity. Any violation will be reported and may result in disciplinary action.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartTest}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              I Understand - Start Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Post-test results screen
  if (testEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Test Completed</h2>
            <p className="text-gray-600">Your test has been submitted successfully</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Test Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Test Name:</span>
                <span className="font-semibold text-gray-800">{testName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold text-gray-800">{duration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tab Switches Detected:</span>
                <span className={`font-semibold ${tabSwitches > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {tabSwitches}
                </span>
              </div>
            </div>
          </div>

          {warnings.length > 0 && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Violations Recorded
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {warnings.map((warning, index) => (
                  <div key={index} className="text-sm text-red-700 flex gap-2">
                    <span className="font-medium">{warning.time}:</span>
                    <span>{warning.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => window.close()}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-4 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  // Active test screen
  return (
    <div ref={containerRef} className="h-screen bg-gray-900 flex">
      {/* Sidebar - Timer and Warnings */}
      <div className="w-80 bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{testName}</h2>
              <p className="text-gray-400 text-sm">{totalMarks} Marks</p>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="p-6 border-b border-gray-700">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300 font-medium">Time Remaining</span>
            </div>
            <div className={`text-4xl font-bold ${getTimerColor()} tabular-nums`}>
              {formatTime(timeRemaining)}
            </div>
            <div className="mt-4 bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000"
                style={{ width: `${(timeRemaining / (duration * 60)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Warnings */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-amber-400" />
              <span className="text-gray-300 font-medium">Monitoring</span>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Tab Switches</span>
                <span className={`font-bold text-lg ${tabSwitches > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {tabSwitches}
                </span>
              </div>
            </div>
          </div>

          {warnings.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-gray-300 font-medium">Violations</span>
              </div>
              <div className="space-y-2">
                {warnings.slice(-5).reverse().map((warning, index) => (
                  <div key={index} className="bg-red-900/20 border border-red-800/50 rounded-xl p-3">
                    <div className="text-red-400 text-xs font-medium mb-1">{warning.time}</div>
                    <div className="text-red-300 text-sm">{warning.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* End Test Button */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleEndTest}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
          >
            End Test & Submit
          </button>
        </div>
      </div>

      {/* Main Content - PDF Viewer */}
<div className="flex-1 bg-gray-100 p-6 overflow-hidden">
  <div className="h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
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
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium">No PDF available</p>
          <p className="text-sm">Please contact your instructor</p>
        </div>
      </div>
    )}
  </div>
</div>
    </div>
  );
}