import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CreateProjectModal from "./CreateProjectModal";
import { Trash2 } from "lucide-react";

export default function Profile() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      const token = Cookies.get("token");

      const res = await fetch(`http://localhost:800/project/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete project");

      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

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
        description: project.description || "",
        role: project.role,
      }));

      setProjects(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async ({ name, description }) => {
    try {
      const token = Cookies.get("token");

      const res = await fetch("http://localhost:800/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          token,
        }),
      });

      if (!res.ok) throw new Error("Failed to create project");

      const project = await res.json();

      setProjects((prev) => [
        {
          id: project._id,
          name: project.name,
          description: project.description || "",
          role: "Master",
        },
        ...prev,
      ]);

      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading projects...
      </div>
    );
  }

  return (
    <>
      <div className={`min-h-screen bg-gray-50 ${showModal ? "blur-sm" : ""}`}>
        <div className="max-w-4xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">
                Your Projects
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage and access all your workspaces
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition"
            >
              Create Project
            </button>
          </div>

          {/* Projects */}
          {projects.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow-sm">
              No projects yet. Create one to get started.
            </div>
          ) : (
            <ul className="space-y-5">
              {projects.map((project) => (
                <li
                  key={project.id}
                  onClick={() => navigate("/demo")}
                  className="group flex items-center justify-between p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                      {project.name}
                    </p>

                    {project.description ? (
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {project.description}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400 italic mt-1">
                        No description
                      </p>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(project.id);
                    }}
                    className="ml-4 p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
           )
          }

          {/* Sample Project */}
          <div className="mt-5">

            <li
              onClick={() => navigate("/kanban")}
              className="flex items-center justify-between p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Sample Project
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  This is a sample project for demonstration purposes.
                </p>
              </div>

              <button
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
              >
                <Trash2 size={18} />
              </button>
            </li>
          </div>
        </div>
      </div>

      <CreateProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateProject}
      />
    </>
  );
}
