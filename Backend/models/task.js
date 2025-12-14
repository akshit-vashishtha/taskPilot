const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ['backlog', 'toDo', 'inProgress', 'done'],
      default: 'toDo',
    },

    deadline: {
      type: Date,
    },

    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    complexityScore: {
      type: Number,
      min: 1,
      max: 10,
    },

    riskScore: {
      type: Number,
      min: 1,
      max: 10,
    },

    impactScore: {
      type: Number,
      min: 1,
      max: 10,
    },

    description: {
      type: String,
      trim: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    position: {
      type: Number,
      default: 0,
    },

    historyLogs: [
      {
        type: String,
      },
    ],

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', TaskSchema);
