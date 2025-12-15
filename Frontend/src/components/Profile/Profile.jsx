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

  const handleCreateProject = async ({ name }) => {
  try {
    const token = Cookies.get("token");

    const res = await fetch("http://localhost:800/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        token, // ✅ send token in body
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
      <div className="flex items-center justify-center h-40 text-gray-500">
        Loading projects...
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      <div className={`max-w-3xl mx-auto p-6 ${showModal ? "blur-xl" : ""}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Your Projects
          </h2>

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
            {/* Backend Projects */}
            {projects.map((project) => (
              <li
                key={project.id}
                onClick={() => navigate("/demo")}
                className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm cursor-pointer hover:bg-gray-50"
              >
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {project.name}
                  </p>
                  {project.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {project.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project.id);
                  }}
                  className="p-2 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition"
                  title="Delete project"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}

            {/* Hardcoded Sample Project (always last) */}
            <li
              onClick={() => navigate("/kanban")}
              className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm cursor-pointer hover:bg-gray-50"
            >
              <p className="text-lg font-medium text-gray-900">
                Sample Project
              </p>

               <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-2 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
            </li>
          </ul>
        )}
      </div>

      {/* Modal */}
      <CreateProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateProject}
      />
    </>
  );
}
