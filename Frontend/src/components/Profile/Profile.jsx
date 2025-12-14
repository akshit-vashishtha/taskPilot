import React, { useEffect, useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import Cookies from "js-cookie";
import Abc from "./abc";

export default function Profile() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    fetchUserProjects();
  }, []);

  const fetchUserProjects = async () => {
    try {
      const token = Cookies.get("token");

      const res = await fetch("http://localhost:800/project/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const formatted = data.map((project) => ({
        id: project._id,
        name: project.name,
        role: project.role,
      }));

      setProjects(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async ({ name, token }) => {
    try {
      const res = await fetch("http://localhost:800/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, token }),
      });

      if (!res.ok) {
        throw new Error("Failed to create project");
      }

      const project = await res.json();

      const newProject = {
        id: project._id,
        name: project.name,
        role: "Master",
      };

      setProjects((prev) => [newProject, ...prev]);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // If a project is selected, show Abc component
  if (activeProject) {
    return (
      <Abc
        projectId={activeProject.id}
        role={activeProject.role}
        onBack={() => setActiveProject(null)}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Projects</h2>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        >
          Create Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          You are not part of any projects yet.
        </div>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm cursor-pointer hover:bg-gray-50"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {project.name}
                </p>
                <p className="text-sm text-gray-500">Role: {project.role}</p>
              </div>

              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                {project.role}
              </span>
            </li>
          ))}
        </ul>
      )}

      <CreateProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}
