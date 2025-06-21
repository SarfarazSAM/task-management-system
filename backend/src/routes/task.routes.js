import express from 'express';
import { body } from 'express-validator';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTaskStats,
} from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post(
  '/',
  [
    body('title', 'Title is required').not().isEmpty(),
    body('description', 'Description is required').not().isEmpty(),
    body('dueDate', 'Due date is required').isISO8601().toDate(),
    body('status')
      .optional()
      .isIn(['pending', 'in progress', 'completed']),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high']),
  ],
  createTask
);

// @route   GET /api/tasks
// @desc    Get all tasks for logged in user
// @access  Private
router.get('/', getTasks);

// @route   GET /api/tasks/stats
// @desc    Get task statistics
// @access  Private
router.get('/stats', getTaskStats);

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
router.get('/:id', getTask);

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put(
  '/:id',
  [
    body('status')
      .optional()
      .isIn(['pending', 'in progress', 'completed']),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high']),
  ],
  updateTask
);

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', deleteTask);

export default router;
