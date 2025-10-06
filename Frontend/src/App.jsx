import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Kanban from './components/Kanban'
import Profiles from './components/Profiles'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/kanban" replace />} />
          <Route path="/kanban" element={<Kanban name="Kanban" />} />
          <Route path="/profiles" element={<Profiles />} />
        </Routes>
      </div>
    </Router>
  )
}
