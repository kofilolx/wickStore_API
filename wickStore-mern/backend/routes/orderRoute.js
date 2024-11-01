const express = require('express');
const { 
    newOrder, 
    getSingleOrderDetails, 
    myOrders, 
    getAllOrders, 
    updateOrder, 
    deleteOrder 
} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Route to create a new order; requires user to be authenticated
router.route('/order/new').post(isAuthenticatedUser, newOrder);

// Route to get details of a single order by ID; requires user to be authenticated
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrderDetails);

// Route to get all orders for the authenticated user
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

// Admin route to get all orders; requires user to be authenticated and have 'admin' role
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

// Admin routes for updating and deleting a specific order by ID; requires user to be authenticated and have 'admin' role
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

// Export the router to be used in other parts of the application
module.exports = router;
