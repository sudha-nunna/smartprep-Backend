const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');//1
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { sendResetPasswordEmail } = require('../utils/emailServices');//1
 
// Utility to sign JWT and send response
const createSendToken = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d',
  });
 
  // Remove password from output
  user.password = undefined;
 
  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};
 
// I've renamed this to `register` to match your `authRoutes.js` file
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, childAge, childEmail, subscribeNewsletter, role } = req.body;
 
    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please provide first name, last name, email, and password.' });
    }
 
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }
 
    // Normalise and validate role (optional, defaults to 'parent')
    const allowedRoles = ["student", "parent", "teacher"];
    let normalisedRole = "parent";
    if (role && typeof role === "string") {
      const lowerRole = role.toLowerCase();
      if (allowedRoles.includes(lowerRole)) {
        normalisedRole = lowerRole;
      }
    }

    // Optionally, we can later add logic here to verify that childEmail corresponds
    // to an existing student account.

    // Create new user (password will be hashed by the pre-save hook in userModel.js)
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      childAge,
      childEmail,
      subscribeNewsletter,
      role: normalisedRole,
    });
 
    // Log user in by sending a token
    createSendToken(newUser, 201, res);
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join('. ') });
    }
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};
 //login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    // Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    // If everything is ok, send token to client
    createSendToken(user, 200, res);
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Protect middleware to your authController
exports.protect = async (req, res, next) => {
  try {
    let token;
    // 1) Get token and check if it's there
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
    }

    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: 'The user belonging to this token does no longer exist.',
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
    }
    console.error('PROTECT MIDDLEWARE ERROR: ', error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};
//forgot password code
exports.forgotPassword = async (req, res) => {
  try {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // To prevent email enumeration, we send a generic success message.
      // The frontend will always show the "Check your email" screen.
      return res.status(200).json({
        status: 'success',
        message: 'If an account with this email exists, a reset link has been sent.',
      });
    }

    // 2) Generate the random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 3) Hash the token and set token and expiry on the user object.
    // We save the hashed version for security. This requires new fields on your User model.
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // Expires in 15 minutes

    await user.save({ validateBeforeSave: false });

    // 4) Send the unhashed token to the user's email
    await sendResetPasswordEmail(user.email, resetToken);

    res.status(200).json({
      status: 'success',
      message: 'Password reset link sent to your email.',
    });
  } catch (error) {
    // In case of a server or DB error, we don't want to leak details.
    // The email service already handles its own errors, so this is for other issues.
    console.error('FORGOT PASSWORD ERROR:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};
