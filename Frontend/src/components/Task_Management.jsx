import React, { useState, useRef } from 'react';
import { Plus, Calendar, User, Tag, Flag, Clock, X } from 'lucide-react';
import { sampleTasks, getNextTaskId, addTimestamps } from '../data/sampleTasks';
import { priorities, statusOptions, priorityOptions } from '../data/taskConfig';

export default function TaskManagement() {
  const [tasks, setTasks] = useState(sampleTasks);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignee: "",
    dueDate: "",
    tags: "",
    status: "backlog",
  });

  const nextId = useRef(getNextTaskId());

  const isOverdue = (dueDate, status) => {
    if (status === "done") return false;
    return new Date(dueDate) < new Date();
  };

  const addTask = () => {
    if (!newTask.title.trim()) {
      alert("Task title is required!");
      return;
    }

    const task = addTimestamps({
      id: nextId.current++,
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      priority: newTask.priority,
      assignee: newTask.assignee.trim(),
      dueDate: newTask.dueDate,
      tags: newTask.tags 
        ? newTask.tags.split(",").map(tag => tag.trim()).filter(tag => tag) 
        : [],
      status: newTask.status,
      position: tasks.filter(t => t.status === newTask.status).length, // Position for drag-and-drop
    });

    setTasks([...tasks, task]);
    
    // Reset form
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      assignee: "",
      dueDate: "",
      tags: "",
      status: "backlog",
    });
    
    setShowAddForm(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const days = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Create New Task</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Title - Required */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Write Documentation"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description - Optional */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  placeholder="Detailed description of the task..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Flag size={16} className="inline mr-1" />
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
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
                <input
                  type="text"
                  placeholder="Person's name"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar size={16} className="inline mr-1" />
                  Due Date
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status/Column */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status/Column
                </label>
                <select
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status.key} value={status.key}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags/Labels */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Tag size={16} className="inline mr-1" />
                  Tags/Labels
                </label>
                <input
                  type="text"
                  placeholder="e.g., docs, frontend, api, review (comma-separated)"
                  value={newTask.tags}
                  onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus size={48} className="mx-auto mb-2" />
                <p className="text-lg">No tasks yet</p>
                <p className="text-sm">Click "Add Task" to create your first task</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-white rounded-lg shadow-sm border-l-4 p-4 ${
                    isOverdue(task.dueDate, task.status) 
                      ? "border-l-red-500 bg-red-50" 
                      : "border-l-blue-500"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800 text-lg">{task.title}</h3>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {task.description && (
                    <p className="text-gray-600 mb-3">{task.description}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    {/* Priority */}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorities[task.priority].color}`}>
                      <Flag size={12} className="inline mr-1" />
                      {priorities[task.priority].label}
                    </span>

                    {/* Status */}
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {statusOptions.find(s => s.key === task.status)?.label}
                    </span>

                    {/* Assignee */}
                    {task.assignee && (
                      <span className="text-sm text-gray-600">
                        <User size={14} className="inline mr-1" />
                        {task.assignee}
                      </span>
                    )}

                    {/* Due Date with overdue detection */}
                    {task.dueDate && (
                      <span className={`text-sm ${
                        isOverdue(task.dueDate, task.status) 
                          ? "text-red-600 font-medium" 
                          : "text-gray-600"
                      }`}>
                        <Calendar size={14} className="inline mr-1" />
                        {formatDate(task.dueDate)}
                        {isOverdue(task.dueDate, task.status) && " (Overdue)"}
                        {!isOverdue(task.dueDate, task.status) && getDaysUntilDue(task.dueDate) !== null && (
                          <span className="ml-1">
                            ({getDaysUntilDue(task.dueDate)} days remaining)
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {task.tags && task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.tags.map((tag, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                          <Tag size={10} className="inline mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="text-xs text-gray-500 flex gap-4">
                    <span>
                      <Clock size={12} className="inline mr-1" />
                      Created: {new Date(task.createdAt).toLocaleString()}
                    </span>
                    <span>
                      Updated: {new Date(task.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
