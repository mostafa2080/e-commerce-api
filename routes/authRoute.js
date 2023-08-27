const express = require('express');

/**
 * @openapi
 * tags:
 *   name: Authentication
 *   description: User authentication and account management
 */

/**
 * @openapi
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name.
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               phone:
 *                 type: string
 *                 description: User's phone number.
 *               password:
 *                 type: string
 *                 description: User's password.
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 */

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in as a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: User's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 */

/**
 * @openapi
 * /api/v1/auth/forgotPassword:
 *   post:
 *     summary: Request a password reset email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset email sent successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 */

/**
 * @openapi
 * /api/v1/auth/verifyResetCode:
 *   post:
 *     summary: Verify the password reset code
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               code:
 *                 type: string
 *                 description: Password reset code received via email.
 *             required:
 *               - email
 *               - code
 *     responses:
 *       200:
 *         description: Password reset code verified successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 */

/**
 * @openapi
 * /api/v1/auth/resetPassword:
 *   put:
 *     summary: Reset the user's password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               newPassword:
 *                 type: string
 *                 description: New password to set.
 *             required:
 *               - email
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's name.
 *         slug:
 *           type: string
 *           description: User's slug.
 *         email:
 *           type: string
 *           description: User's email address.
 *         phone:
 *           type: string
 *           description: User's phone number.
 *         profileImage:
 *           type: string
 *           description: URL of the user's profile image.
 *         role:
 *           type: string
 *           description: User's role (admin, manager, user).
 *         active:
 *           type: boolean
 *           description: Indicates if the user's account is active.
 *         wishList:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of product IDs in the user's wishlist.
 *         addresses:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               alias:
 *                 type: string
 *                 description: Alias for the address.
 *               details:
 *                 type: string
 *                 description: Address details.
 *               phone:
 *                 type: string
 *                 description: Phone number associated with the address.
 *               city:
 *                 type: string
 *                 description: City of the address.
 *               postalCode:
 *                 type: string
 *                 description: Postal code of the address.
 */

const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require('../services/authService');

const {
  signupValidator,
  loginValidator,
  forgotPasswordValidator,
} = require('../utils/validators/authValidator');

router.route('/signup').post(signupValidator, signup);

router.route('/login').post(loginValidator, login);
router.route('/forgotPassword').post(forgotPasswordValidator, forgotPassword);
router.route('/verifyResetCode').post(verifyPassResetCode);
router.route('/resetPassword').put(resetPassword);

module.exports = router;
