import React from 'react'
import './Dashboard.css';
import StudentList from './StudentList';
import CourseList from './CourseList';
import About from './About';

import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/StudentList" className="navbar-link">Student List</Link>
          </li>
          <li className="navbar-item">
            <Link to="/CourseList" className="navbar-link">Course List</Link>
          </li>
          {/* <li className="navbar-item"> */}
            {/* <Link to="/about" className="navbar-link">About</Link> */}
          {/* </li> */}
        </ul>
      </nav>
      <h2>Welcome to the Zen Class Student Dashboard</h2>
      <div className="stats">
        <div className="stat">
          <h3>Total Students</h3>
          <p>25</p>
        </div>
        <div className="stat">
          <h3>Total Courses</h3>
          <p>20</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
