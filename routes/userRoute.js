const express = require('express');
/**
 * @openapi
 * tags:
 *   name: Users
 *   description: API for managing users.
 */

/**
 * @openapi
 * /users/getMe:
 *   get:
 *     summary: Get logged-in user's data.
 *     description: Get the data of the logged-in user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with the user data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @openapi
 * /users/changeMyPassaowrd:
 *   put:
 *     summary: Change logged-in user's password.
 *     description: Change the password of the logged-in user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: New password information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The current password of the user.
 *                 example: currentPassword123
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *                 example: newPassword456
 *     responses:
 *       '204':
 *         description: Password changed successfully.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */

/**
 * @openapi
 * /users/updateMe:
 *   put:
 *     summary: Update logged-in user's data.
 *     description: Update the data of the logged-in user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated user data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User data updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */

/**
 * @openapi
 * /users/deleteMe:
 *   delete:
 *     summary: Delete logged-in user's account.
 *     description: Delete the account of the logged-in user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: User account deleted successfully.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */

/**
 * @openapi
 * /users/changePassword/{id}:
 *   put:
 *     summary: Change password for a user.
 *     description: Change the password of a user by ID (admin/manager).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user.
 *     requestBody:
 *       description: New password information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *                 example: newPassword456
 *     responses:
 *       '204':
 *         description: Password changed successfully.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 */

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user.
 *     description: Create a new user account (admin/manager).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User data for registration.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '409':
 *         $ref: '#/components/responses/ConflictError'
 *
 *   get:
 *     summary: Get a list of all users.
 *     description: Get a list of all user accounts (admin/manager).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with a list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by ID.
 *     description: Get user details by ID (admin/manager).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user.
 *     responses:
 *       '200':
 *         description: Successful response with user data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *
 *   put:
 *     summary: Update user by ID.
 *     description: Update user details by ID (admin).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user.
 *     requestBody:
 *       description: Updated user data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User data updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *
 *   delete:
 *     summary: Delete user by ID.
 *     description: Delete user account by ID (admin).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user.
 *     responses:
 *       '204':
 *         description: User account deleted successfully.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 */

const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  processingImage,
  ChangeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require('../services/userService');

const {
  getUserValidator,
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
} = require('../utils/validators/userValidator');

const { protect, allowedTo } = require('../services/authService');

router.get('/getMe', protect, getLoggedUserData, getUser);
router.put('/changeMyPassaowrd', protect, updateLoggedUserPassword);
router.put(
  '/updateMe',
  protect,
  updateLoggedUserValidator,
  updateLoggedUserData
);
router.delete('/deleteMe', protect, deleteLoggedUserData);
//admin
// router.use(protect, allowedTo('admin'));  this will be applied to all the below routes
router
  .route('/changePassword/:id')
  .put(
    allowedTo('admin', 'manager'),
    changeUserPasswordValidator,
    ChangeUserPassword
  );

router
  .route('/')
  .post(uploadUserImage, processingImage, createUserValidator, createUser)
  .get(protect, allowedTo('admin', 'manager'), getUsers);
router
  .route('/:id')
  .get(protect, allowedTo('admin', 'manager'), getUserValidator, getUser)
  .put(
    protect,
    allowedTo('admin'),
    uploadUserImage,
    processingImage,
    updateUserValidator,
    updateUser
  )
  .delete(protect, allowedTo('admin'), deleteUserValidator, deleteUser);

module.exports = router;
