import React, { useMemo, useState } from 'react'
import { sampleTasks } from '../data/sampleTasks'
import generateProfiles from '../services/generateProfiles'

function RatingCircle({ score }) {
  const color = score >= 85 ? 'bg-green-500' : score >= 65 ? 'bg-yellow-400' : score >= 45 ? 'bg-orange-400' : 'bg-red-500'
  return (
    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white ${color} shadow-lg`}> 
      <div className="text-center">
        <div className="text-lg font-bold">{score}</div>
        <div className="text-xs">/100</div>
      </div>
    </div>
  )
}

export default function Profiles() {
  console.log("inside profile");
  // Block access when not logged in
  import('js-cookie');
  const Cookies = require('js-cookie');
  const isLogged = Boolean(Cookies.get('token'));
  if (!isLogged) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Log in first</h2>
          <p className="text-sm text-gray-500 mt-2">You must be logged in to view profiles.</p>
        </div>
      </div>
    )
  }

  // sampleTasks is exported as named export; adapt if default import fails
  const tasks = useMemo(() => sampleTasks || [], [])

  const profiles = useMemo(() => generateProfiles(tasks), [tasks])
  const [showJSON, setShowJSON] = useState(false)

  const copyJSON = (p) => {
    const json = JSON.stringify({ Name: p.Name, Rating: p.Rating, Review: p.Review }, null, 2)
    navigator.clipboard.writeText(json)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Profiles</h2>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowJSON((s) => !s)} className="px-3 py-1 rounded bg-gray-100 border">{showJSON ? 'Hide JSON' : 'Show JSON'}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((p) => (
          <div key={p.Name} className="bg-white rounded-lg shadow p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{p.Name}</div>
                <div className="text-sm text-gray-500">{p._meta.totalTasks} tasks • {p._meta.done} done • {p._meta.overdue} overdue</div>
              </div>
              <RatingCircle score={p.Rating} />
            </div>

            <div className="text-sm text-gray-700">{p.Review}</div>

            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-500">Recent updates: {p._meta.recentUpdates}</div>
              <div className="flex gap-2">
                <button onClick={() => copyJSON(p)} className="px-3 py-1 text-sm rounded bg-blue-50 text-blue-700 border">Copy JSON</button>
              </div>
            </div>

            {showJSON && (
              <pre className="mt-3 p-3 bg-gray-50 text-xs rounded overflow-auto">{JSON.stringify({ Name: p.Name, Rating: p.Rating, Review: p.Review }, null, 2)}</pre>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
