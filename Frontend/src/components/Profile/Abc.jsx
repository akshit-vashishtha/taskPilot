import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Abc({ projectId, role, onBack }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [allUsers, setAllUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProject();
    if (role === 'Master') {
      fetchUsers();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`http://localhost:800/project/${projectId}`);
      const data = await res.json();
      setProject(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:800/user');
      const data = await res.json();
      setAllUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async () => {
    setError('');

    const user = allUsers.find(
      u => u.name.toLowerCase() === username.trim().toLowerCase()
    );

    if (!user) {
      setError('User not found');
      return;
    }

    try {
      const token = Cookies.get('token');

      const res = await fetch(`http://localhost:800/project/${projectId}/add-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          token,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add user');
      }

      setUsername('');
      fetchProject(); // refresh members
    } catch (err) {
      console.error(err);
      setError('Could not add user');
    }
  };

  if (loading) {
    return <div className="p-6">Loading project...</div>;
  }

  if (!project) {
    return <div className="p-6">Project not found</div>;
  }

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-blue-600"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold">{project.name}</h2>

      <p className="text-sm text-gray-500 mt-1">
        Your role: {role}
      </p>

      {/* Add user bar (Master only) */}
      {role === 'Master' && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-medium mb-2">Add user to project</h3>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 mt-2">{error}</p>
          )}
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-medium mb-2">Members</h3>
        <ul className="list-disc pl-5">
          {project.users.map(user => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
