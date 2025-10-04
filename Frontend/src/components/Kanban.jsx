import React, { useState, useEffect, useRef } from "react";
import { Search, Plus, Filter, Calendar, Clock, Flag, User, MoreHorizontal } from "lucide-react";

const initialTasks = [
  { id: 1, title: "Design UI Components", status: "toDo", deadline: "2025-09-20", priority: "high", assignee: "John Doe", description: "Create reusable UI components for the dashboard", tags: ["design", "frontend"] },
  { id: 2, title: "Build REST API", status: "inProgress", deadline: "2025-09-18", priority: "high", assignee: "Jane Smith", description: "Develop backend API endpoints", tags: ["backend", "api"] },
  { id: 3, title: "Write Documentation", status: "done", deadline: "2025-09-10", priority: "medium", assignee: "Mike Johnson", description: "Complete technical documentation", tags: ["docs"] },
  { id: 4, title: "Code Review", status: "inProgress", deadline: "2025-09-17", priority: "medium", assignee: "Sarah Wilson", description: "Review pull requests", tags: ["review"] },
];

const columns = [
  { key: "toDo", label: "To Do", color: "bg-slate-50 border-slate-200", limit: 5 },
  { key: "inProgress", label: "In Progress", color: "bg-blue-50 border-blue-200", limit: 3 },
  { key: "review", label: "Review", color: "bg-amber-50 border-amber-200", limit: 4 },
  { key: "done", label: "Done", color: "bg-emerald-50 border-emerald-200", limit: null },
  { key: "backlog", label: "Backlog", color: "bg-red-50 border-red-200", limit: null },
];

const priorities = {
  low: { color: "text-green-600 bg-green-100", icon: "↓" },
  medium: { color: "text-yellow-600 bg-yellow-100", icon: "→" },
  high: { color: "text-red-600 bg-red-100", icon: "↑" },
  urgent: { color: "text-purple-600 bg-purple-100", icon: "!!" },
};

function TaskCard({ task, moveTask, deleteTask, editTask, onDragStart, onDragEnd }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...task });
  
  const isOverdue = new Date(task.deadline) < new Date() && task.status !== "done";
  const daysUntilDeadline = Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  
  const handleEdit = () => {
    editTask(task.id, editData);
    setIsEditing(false);
  };

  const handleDragStart = (e) => {
    onDragStart(task);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", task.id.toString());
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      className={`bg-white rounded-lg shadow-sm border-l-4 mb-3 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isOverdue ? "border-l-red-500 bg-red-50" : "border-l-transparent"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full font-medium text-gray-800 border rounded px-2 py-1"
                onBlur={handleEdit}
                onKeyPress={(e) => e.key === "Enter" && handleEdit()}
                autoFocus
              />
            ) : (
              <h3 
                className="font-medium text-gray-800 cursor-pointer hover:text-blue-600"
                onClick={() => setShowDetails(!showDetails)}
              >
                {task.title}
              </h3>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <MoreHorizontal size={14} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 p-1"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorities[task.priority].color}`}>
            {priorities[task.priority].icon} {task.priority}
          </span>
          {task.assignee && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <User size={12} />
              <span>{task.assignee}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <Calendar size={12} />
          <span className={isOverdue ? "text-red-600 font-medium" : ""}>
            {task.deadline} {daysUntilDeadline >= 0 ? `(${daysUntilDeadline}d)` : "(overdue)"}
          </span>
        </div>

        {task.tags && (
          <div className="flex flex-wrap gap-1 mb-2">
            {task.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        {showDetails && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            <div className="flex flex-wrap gap-1">
              {columns.map((col) => (
                <button
                  key={col.key}
                  onClick={() => moveTask(task.id, col.key)}
                  className={`text-xs px-2 py-1 rounded transition ${
                    task.status === col.key 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {col.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Column({ column, tasks, moveTask, deleteTask, editTask, onDrop, onDragOver, draggedTask }) {
  const isOverLimit = column.limit && tasks.length >= column.limit;
  const canDrop = draggedTask && draggedTask.status !== column.key && !isOverLimit;

  return (
    <div 
      className={`flex-1 ${column.color} rounded-lg p-4 min-h-[500px] flex flex-col border transition-all duration-200 ${
        canDrop ? "ring-2 ring-blue-300 ring-opacity-50" : ""
      }`}
      onDrop={(e) => onDrop(e, column.key)}
      onDragOver={onDragOver}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700 flex items-center gap-2">
          {column.label}
          <span className={`text-sm px-2 py-1 rounded-full ${
            isOverLimit ? "bg-red-100 text-red-600" : "bg-white text-gray-500"
          }`}>
            {tasks.length}{column.limit ? `/${column.limit}` : ""}
          </span>
        </h2>
        {isOverLimit && (
          <Flag size={16} className="text-red-500" title="Column limit reached" />
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            moveTask={moveTask} 
            deleteTask={deleteTask}
            editTask={editTask}
            onDragStart={() => {}}
            onDragEnd={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default function Kanban({name}) {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterAssignee, setFilterAssignee] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "medium",
    assignee: "",
    tags: "",
  });

  const nextId = useRef(Math.max(...tasks.map(t => t.id)) + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTasks((prev) =>
        prev.map((task) => {
          if (new Date(task.deadline) < now && task.status !== "done") {
            return { ...task, status: "backlog" };
          }
          return task;
        })
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const moveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId, updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  const addTask = () => {
    if (!newTask.title || !newTask.deadline) return;
    
    const task = {
      id: nextId.current++,
      title: newTask.title,
      description: newTask.description,
      status: "toDo",
      deadline: newTask.deadline,
      priority: newTask.priority,
      assignee: newTask.assignee,
      tags: newTask.tags ? newTask.tags.split(",").map(tag => tag.trim()) : [],
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "medium",
      assignee: "",
      tags: "",
    });
    setShowAddForm(false);
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDrop = (e, columnKey) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== columnKey) {
      moveTask(draggedTask.id, columnKey);
    }
    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = !filterPriority || task.priority === filterPriority;
    const matchesAssignee = !filterAssignee || task.assignee?.toLowerCase().includes(filterAssignee.toLowerCase());
    
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const uniqueAssignees = [...new Set(tasks.map(task => task.assignee).filter(Boolean))];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex gap-4 items-center flex-wrap">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Assignees</option>
              {uniqueAssignees.map(assignee => (
                <option key={assignee} value={assignee}>{assignee}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <input
                type="text"
                placeholder="Task title *"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="date"
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent Priority</option>
              </select>
              <input
                type="text"
                placeholder="Assignee"
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={newTask.tags}
                onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={addTask}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="w-full h-full">
          <div className="flex gap-4 h-full overflow-x-auto">
            {columns.map((col) => (
              <Column
                key={col.key}
                column={col}
                tasks={filteredTasks.filter((task) => task.status === col.key)}
                moveTask={moveTask}
                deleteTask={deleteTask}
                editTask={editTask}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                draggedTask={draggedTask}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}