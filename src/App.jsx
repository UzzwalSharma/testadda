import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Hero from './Mainpage/Hero';
import Content from './Mainpage/Content';
import Worksheets from "./Mainpage/Worksheets";
import TestsSection from "./Mainpage/Tests";
import AdminPanel from "./Admin/Admin";
import Login from "../Auth/Login";
import StudentDashboard from "../Auth/StudentDashboard";

function App() {
  const [student, setStudent] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/start" element={<Content />} />
        <Route path="/worksheets" element={<Worksheets />} />
        <Route path="/tests" element={<TestsSection />} />

        {/* Pass handleLogin function to Login */}
        <Route path="/login" element={<Login onLogin={setStudent} />} />

        {/* Only allow dashboard if logged in */}
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
  );
}

export default App;
