const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const { name, token } = req.body;

    console.log('Create project request:', { name });

    if (!name) {
      console.log('Project creation failed: name missing');
      return res.status(400).json({ message: 'Project name is required' });
    }

    if (!token) {
      console.log('Project creation failed: token missing');
      return res.status(401).json({ message: 'Token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    console.log('Authenticated user:', userId);

    const project = await Project.create({
      name,
      masterUser: userId,
      users: [userId],
      tasks: [],
    });

    console.log('Project created:', project._id);

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { projects: project._id } }
    );

    console.log('Project added to user:', userId);

    res.status(201).json(project);
  } catch (err) {
    console.error('Create project error:', err);
    res.status(400).json({ message: err.message });
  }
});


/**
 * Get projects of current user
 */
router.get('/my', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const projects = await Project.find({
      _id: { $in: user.projects },
    });

    const response = projects.map(project => ({
      _id: project._id,
      name: project.name,
      role:
        project.masterUser.toString() === userId
          ? 'Master'
          : 'Member',
    }));

    res.json(response);
  } catch (err) {
    console.error('Get user projects error:', err.message);
    res.status(400).json({ message: err.message });
  }
});




/**
 * Get all projects
 */
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



/**
 * Get single project by id
 */
router.get('/:id', async (req, res) => {
    console.log(req.params);
  try {
    const project = await Project.findById(req.params.id)
      .populate('masterUser', 'name email')
      .populate('users', 'name email')
      .populate('tasks');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    res.status(400).json({ message: 'Invalid project id' });
  }
});


router.post('/:id/add-user', async (req, res) => {
  try {
    const { userId, token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const masterId = decoded.userId;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.masterUser.toString() !== masterId) {
      return res.status(403).json({ message: 'Only master can add users' });
    }

    await Project.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { users: userId } }
    );

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { projects: project._id } }
    );

    res.json({ message: 'User added to project' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


/**
 * Update project
 */
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Delete project
 */
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid project id' });
  }
});

module.exports = router;
