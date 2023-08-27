const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the user.
 *         name:
 *           type: string
 *           description: The name of the user.
 *         slug:
 *           type: string
 *           description: The slug for the user's name.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         phone:
 *           type: string
 *           description: The phone number of the user.
 *         profileImage:
 *           type: string
 *           description: The URL of the user's profile image.
 *         password:
 *           type: string
 *           description: The hashed password of the user.
 *         passwordChangedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the password was last changed.
 *         passwordResetToken:
 *           type: string
 *           description: The token for resetting the user's password.
 *         passwordResetExpires:
 *           type: string
 *           format: date-time
 *           description: The date and time when the password reset token expires.
 *         passwordResetVerified:
 *           type: boolean
 *           description: Indicates if the password reset token has been verified.
 *         role:
 *           type: string
 *           enum: [user, manager, admin]
 *           description: The role of the user.
 *         active:
 *           type: boolean
 *           description: Indicates if the user's account is active.
 *         wishList:
 *           type: array
 *           items:
 *             type: string
 *           description: List of product IDs in the user's wishlist.
 *         addresses:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               alias:
 *                 type: string
 *               details:
 *                 type: string
 *               phone:
 *                 type: string
 *               city:
 *                 type: string
 *               postalCode:
 *                 type: string
 *           description: List of addresses associated with the user.
 *       example:
 *         _id: 6151607a379b520015230aba
 *         name: John Doe
 *         slug: john-doe
 *         email: johndoe@example.com
 *         phone: +1234567890
 *         profileImage: https://example.com/profile.jpg
 *         password: $2a$12$X5/42QAw3wqTAF/IV2vKIuIu9Es/g3J4hvD/Zb/hxuK1WJZ5
 *         passwordChangedAt: 2022-10-01T12:00:00Z
 *         passwordResetToken: abc123def456
 *         passwordResetExpires: 2022-10-15T12:00:00Z
 *         passwordResetVerified: true
 *         role: user
 *         active: true
 *         wishList: [6151607a379b520015230abc, 6151607a379b520015230abd]
 *         addresses:
 *           - id: 6151607a379b520015230abe
 *             alias: Home
 *             details: 123 Main St
 *             phone: +1234567890
 *             city: Example City
 *             postalCode: 12345
 */


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    profileImage: {
      type: String,
      // required: [true, 'User image is required'],
    },

    password: {
      type: String,
      required: true,
      minlength: [6, 'Too Short Password'],
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },

    passwordResetVerified: { type: Boolean },
    role: {
      type: String,
      enum: ['user', 'manager', 'admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
    wishList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ],
    addresses: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        alias: String,
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
