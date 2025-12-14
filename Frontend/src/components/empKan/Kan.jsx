import React, { useState, useEffect, useRef } from "react";
import Cookies from 'js-cookie'
import { Search, Plus, Filter, Calendar, Clock, Flag, User, MoreHorizontal, X, Save, Sparkles, RotateCcw } from "lucide-react";
import { sampleTasks, getNextTaskId, addTimestamps } from "./sampleTasks";
import { columns, priorities, priorityOptions, statusOptions } from "./taskConfig";
import { generateTaskDetails } from "../../../llm_invoke";
import { loadTasks, saveTasks } from "./taskStorage";

function TaskCard({ task, moveTask, deleteTask, editTask, onDragStart, onDragEnd }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ 
    ...task,
    tags: task.tags ? task.tags.join(", ") : ""
  });
  
  const isOverdue = new Date(task.deadline) < new Date() && task.status !== "done";
  const daysUntilDeadline = Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  
  const handleSaveEdit = () => {
    const updatedTask = {
      ...editData,
      tags: editData.tags ? editData.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : [],
      complexityScore: editData.complexityScore === null || editData.complexityScore === undefined ? null : Number(editData.complexityScore),
      riskScore: editData.riskScore === null || editData.riskScore === undefined ? null : Number(editData.riskScore),
      impactScore: editData.impactScore === null || editData.impactScore === undefined ? null : Number(editData.impactScore),
      updatedAt: new Date().toISOString()
    };
    editTask(task.id, updatedTask);
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setEditData({ 
      ...task,
      tags: task.tags ? task.tags.join(", ") : ""
    });
    setShowEditModal(false);
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
            <h3 
              className="font-medium text-gray-800 cursor-pointer hover:text-blue-600"
              onClick={() => setShowDetails(!showDetails)}
            >
              {task.title}
            </h3>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-gray-100 transition-colors"
              title="Edit task"
              draggable={false}
              onDragStart={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <MoreHorizontal size={14} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
              title="Delete task"
              draggable={false}
              onDragStart={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
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

        <div className="flex gap-3 flex-wrap text-sm text-gray-700 mb-2">
          <span className="font-medium">Complexity:</span>
          <span>{task.complexityScore === null || task.complexityScore === undefined ? 'N/A' : `${task.complexityScore}/10`}</span>
          <span className="font-medium">Risk:</span>
          <span>{task.riskScore === null || task.riskScore === undefined ? 'N/A' : `${task.riskScore}/10`}</span>
          <span className="font-medium">Impact:</span>
          <span>{task.impactScore === null || task.impactScore === undefined ? 'N/A' : `${task.impactScore}/10`}</span>
        </div>

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

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCancelEdit}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Edit Task</h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <div className="text-red-500 text-sm mb-1">*</div>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Task title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editData.description || ""}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Task description"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Flag size={16} className="inline mr-1" />
                    Priority
                  </label>
                  <div className="text-red-500 text-sm mb-1">*</div>
                  <select
                    value={editData.priority}
                    onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {priorityOptions.map(option => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assignee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User size={16} className="inline mr-1" />
                    Assignee
                  </label>
                  <div className="text-red-500 text-sm mb-1">*</div>
                  <input
                    type="text"
                    value={editData.assignee || ""}
                    onChange={(e) => setEditData({ ...editData, assignee: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Assignee name"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar size={16} className="inline mr-1" />
                    Deadline
                  </label>
                  <div className="text-red-500 text-sm mb-1">*</div>
                  <input
                    type="date"
                    value={editData.deadline || ""}
                    onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statusOptions.map(option => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={editData.tags}
                    onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Comma-separated tags"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Complexity (0-10)</label>
                  <select
                    value={editData.complexityScore === null || editData.complexityScore === undefined ? '' : String(editData.complexityScore)}
                    onChange={(e) => setEditData({ ...editData, complexityScore: e.target.value === '' ? null : Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Leave Blank</option>
                    {Array.from({ length: 11 }).map((_, i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Risk (0-10)</label>
                  <select
                    value={editData.riskScore === null || editData.riskScore === undefined ? '' : String(editData.riskScore)}
                    onChange={(e) => setEditData({ ...editData, riskScore: e.target.value === '' ? null : Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Leave Blank</option>
                    {Array.from({ length: 11 }).map((_, i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Impact (0-10)</label>
                  <select
                    value={editData.impactScore === null || editData.impactScore === undefined ? '' : String(editData.impactScore)}
                    onChange={(e) => setEditData({ ...editData, impactScore: e.target.value === '' ? null : Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Leave Blank</option>
                    {Array.from({ length: 11 }).map((_, i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={!editData.title?.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
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

export default function Kan({name}) {
  const isLogged = Boolean(Cookies.get('token'));
  if (!isLogged) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Log in first</h2>
          <p className="text-sm text-gray-500 mt-2">You must be logged in to view the Kanban board.</p>
        </div>
      </div>
    )
  }
  const [tasks, setTasks] = useState(() => loadTasks(sampleTasks));
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
    complexityScore: null,
    riskScore: null,
    impactScore: null,
  });
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
  saveTasks(tasks);
}, [tasks]);

  const isAddFormValid = () => {
    return newTask.title?.trim() && newTask.priority && newTask.deadline && newTask.assignee?.trim();
  };

  const handleAiSuggestion = async () => {
    if (!isAddFormValid()) {
      alert("Please fill out the mandatory fields first!");
      return;
    }
    
    setIsAiLoading(true);
    try {
      const suggestions = await generateTaskDetails({
        title: newTask.title,
        priority: newTask.priority,
        assignee: newTask.assignee,
        deadline: newTask.deadline,
        description: newTask.description,
        tags: newTask.tags,
        complexityScore: newTask.complexityScore,
        riskScore: newTask.riskScore,
        impactScore: newTask.impactScore
      });

      if (suggestions) {
        setNewTask(prev => ({
          ...prev,
          description: prev.description || suggestions.description,
          tags: prev.tags || suggestions.tags,
          complexityScore: prev.complexityScore !== null ? prev.complexityScore : suggestions.complexityScore,
          riskScore: prev.riskScore !== null ? prev.riskScore : suggestions.riskScore,
          impactScore: prev.impactScore !== null ? prev.impactScore : suggestions.impactScore
        }));
      }
    } catch (error) {
      console.error("Error generating AI suggestions:", error);
      alert("Failed to generate AI suggestions. Please check your API key configuration.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleClear = () => {
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "medium",
      assignee: "",
      tags: "",
      complexityScore: null,
      riskScore: null,
      impactScore: null,
    });
  };
  

  const getNextId = () => {
  return tasks.length
    ? Math.max(...tasks.map(t => t.id)) + 1
    : 1;
};


  useEffect(() => {
  const applyOverdue = () => {
    const now = new Date();
    setTasks((prev) =>
      prev.map((task) => {
        if (new Date(task.deadline) < now && task.status !== "done") {
          return { ...task, status: "backlog" };
        }
        return task;
      })
    );
  };

  // run immediately on mount
  applyOverdue();

  // then every minute
  const interval = setInterval(applyOverdue, 60);

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
    
    const task = addTimestamps({
      id: getNextId(),
      title: newTask.title,
      description: newTask.description,
      status: "toDo",
      deadline: newTask.deadline,
      priority: newTask.priority,
      assignee: newTask.assignee,
      tags: newTask.tags ? newTask.tags.split(",").map(tag => tag.trim()) : [],
      position: tasks.filter(t => t.status === "toDo").length,
      complexityScore: newTask.complexityScore === null ? null : Number(newTask.complexityScore),
      riskScore: newTask.riskScore === null ? null : Number(newTask.riskScore),
      impactScore: newTask.impactScore === null ? null : Number(newTask.impactScore),
    });
    
    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "medium",
      assignee: "",
      tags: "",
      complexityScore: null,
      riskScore: null,
      impactScore: null,
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
              <div>
                <div className="text-red-500 text-sm mb-1">*</div>
                <input
                  type="text"
                  placeholder="Task title *"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <input
                type="text"
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div>
                <div className="text-red-500 text-sm mb-1">*</div>
                <input
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <div className="text-red-500 text-sm mb-1">*</div>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priorityOptions.map(option => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="text-red-500 text-sm mb-1">*</div>
                <input
                  type="text"
                  placeholder="Assignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={newTask.tags}
                onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complexity (0-10)</label>
                <select
                  value={newTask.complexityScore === null ? '' : String(newTask.complexityScore)}
                  onChange={(e) => setNewTask({ ...newTask, complexityScore: e.target.value === '' ? null : Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Leave Blank</option>
                  {Array.from({ length: 11 }).map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Risk (0-10)</label>
                <select
                  value={newTask.riskScore === null ? '' : String(newTask.riskScore)}
                  onChange={(e) => setNewTask({ ...newTask, riskScore: e.target.value === '' ? null : Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Leave Blank</option>
                  {Array.from({ length: 11 }).map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact (0-10)</label>
                <select
                  value={newTask.impactScore === null ? '' : String(newTask.impactScore)}
                  onChange={(e) => setNewTask({ ...newTask, impactScore: e.target.value === '' ? null : Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Leave Blank</option>
                  {Array.from({ length: 11 }).map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>
              <p className="text-xs text-gray-500 mt-2 lg:col-span-6">If the non-mandatory inputs are not filled, they'll be assessed and completed by AI</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAiSuggestion}
                disabled={isAiLoading}
                className={`bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg transition flex items-center gap-2 ${isAiLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Sparkles size={18} className={isAiLoading ? "animate-spin" : ""} />
                {isAiLoading ? "Generating..." : "AI Suggestion"}
              </button>
              <button
                onClick={handleClear}
                className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
              >
                <RotateCcw size={18} />
                Clear
              </button>
              <button
                onClick={() => {
                  if (!isAddFormValid()) {
                    alert('Please fill the required fields: Task title, Priority, Date and Assignee.');
                    return;
                  }
                  addTask();
                }}
                disabled={!isAddFormValid()}
                className={`px-4 py-2 rounded-lg transition text-white ${isAddFormValid() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}>
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