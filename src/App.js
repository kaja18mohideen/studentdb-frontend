import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/StudentList" element={<StudentList />} />
        <Route path="/CourseList" element={<CourseList />} />
      </Routes>
    </Router>
  );
}

export default App;
