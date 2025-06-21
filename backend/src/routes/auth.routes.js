import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  register
);

// @route   POST /api/auth/login
// @desc    Auth user & get token
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  login
);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  protect,
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email')
      .optional()
      .isEmail(),
    body('password', 'Please enter a password with 6 or more characters')
      .optional()
      .isLength({ min: 6 }),
  ],
  updateUserProfile
);

export default router;
