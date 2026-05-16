const express = require("express");
const { body } = require("express-validator");
const {
  signup,
  login,
  organizerLogin,
  getCurrentUser,
} = require("../controllers/authController");
const { auth } = require("../middleware/auth");

const router = express.Router();

/**
 * POST /api/auth/signup
 * Register new user
 */
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password is required"),
  ],
  signup,
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login,
);

/**
 * POST /api/auth/organizer-login
 * Login organizer
 */
router.post(
  "/organizer-login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  organizerLogin,
);

/**
 * GET /api/auth/me
 * Get current user (protected)
 */
router.get("/me", auth, getCurrentUser);

module.exports = router;
