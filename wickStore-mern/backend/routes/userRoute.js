const express = require('express');
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getUserDetails, 
    forgotPassword, 
    resetPassword, 
    updatePassword, 
    updateProfile, 
    getAllUsers, 
    getSingleUser, 
    updateUserRole, 
    deleteUser 
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Route to register a new user
router.route('/register').post(registerUser);

// Route for user login
router.route('/login').post(loginUser);

// Route for user logout
router.route('/logout').get(logoutUser);

// Route to get details of the authenticated user; requires user to be authenticated
router.route('/me').get(isAuthenticatedUser, getUserDetails);

// Route to initiate password reset process
router.route('/password/forgot').post(forgotPassword);

// Route to reset password using a token
router.route('/password/reset/:token').put(resetPassword);

// Route to update the authenticated user's password; requires user to be authenticated
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

// Route to update the authenticated user's profile; requires user to be authenticated
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

// Admin route to get all users; requires user to be authenticated and have 'admin' role
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

// Admin routes for getting, updating, and deleting a specific user by ID; requires user to be authenticated and have 'admin' role
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

// Export the router to be used in other parts of the application
module.exports = router;
