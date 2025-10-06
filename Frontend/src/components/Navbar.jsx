import React from 'react'
import { NavLink } from 'react-router-dom'

const linkBase = 'px-4 py-2 rounded-md text-sm font-medium'
const active = 'bg-blue-600 text-white'
const inactive = 'text-gray-700 hover:bg-gray-100'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold">taskPilot</div>
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-md">
              <NavLink
                to="/kanban"
                className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
              >
                Kanban
              </NavLink>
              <NavLink
                to="/profiles"
                className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
              >
                Profiles
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
