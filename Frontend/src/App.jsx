import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Kanban from './components/Kanban';
import Login from './components/Login';
import Signup from './components/Signup';
import Profiles from './components/Profiles';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          {/* Default to login so new users hit the auth page first */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/kanban" element={<Kanban name="Kanban" />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}
