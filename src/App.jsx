import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Hero from './Mainpage/Hero';
import Content from './Mainpage/Content';
import Worksheets from "./Mainpage/Worksheets";
import TestsSection from "./Mainpage/Tests";
import AdminPanel from "./Admin/Admin";
import Login from "../Auth/Login";
import StudentDashboard from "../Auth/StudentDashboard";
import ChapterWiseTest from "./Mainpage/Tests/chapterwisetests";
import TestWindow from "./Mainpage/Tests/testwindow";
// import Festival from "../Festival";

function App() {
  const [student, setStudent] = useState(null);
  // const [showFestival, setShowFestival] = useState(true); // control popup visibility

  return (
    <>
     {/* <Festival isVisible={showFestival} onClose={() => setShowFestival(false)} /> */}

      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/start" element={<Content />} />
          <Route path="/worksheets" element={<Worksheets />} />
          <Route path="/tests" element={<TestsSection />} />
          <Route path="/chapterwisetest" element={<ChapterWiseTest />} />
          <Route path="/test-window" element={<TestWindow />} />

          <Route path="/login" element={<Login onLogin={setStudent} />} />

          <Route
            path="/dashboard"
            element={
              student ? (
                <StudentDashboard
                  student={student}
                  onLogout={() => setStudent(null)}
                />
              ) : (
                <Login onLogin={setStudent} />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
