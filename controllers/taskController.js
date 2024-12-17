const Task = require('../models/Task');




// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ message: 'Server error. Could not fetch tasks.' });
  }
};

// Get a single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    // Check ownership
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to access this task.' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error.message);
    res.status(500).json({ message: 'Server error. Could not fetch task.' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate input fields
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'Title is required and must be a string.' });
    }

    const task = new Task({
      title,
      description: description || '', // Optional field
      createdBy: req.user.id
    });

    await task.save();
    res.status(201).json({ message: 'Task created successfully.', task });
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ message: 'Server error. Could not create task.' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    // Validate input fields
    if (title && typeof title !== 'string') {
      return res.status(400).json({ message: 'Title must be a string.' });
    }
    if (description && typeof description !== 'string') {
      return res.status(400).json({ message: 'Description must be a string.' });
    }
    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'Completed must be a boolean value.' });
    }

    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    // Check ownership
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this task.' });
    }

    // Update fields
    task.title = title || task.title;
    task.description = description || task.description;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    res.status(200).json({ message: 'Task updated successfully.', task });
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: 'Server error. Could not update task.' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    // Check ownership
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this task.' });
    }

    await task.deleteOne();

    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ message: 'Server error. Could not delete task.' });
  }
};
