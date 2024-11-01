const express = require('express');
const { 
    getAllProducts, 
    getProductDetails, 
    updateProduct, 
    deleteProduct, 
    getProductReviews, 
    deleteReview, 
    createProductReview, 
    createProduct, 
    getAdminProducts, 
    getProducts 
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Route to get all products
router.route('/products').get(getAllProducts);

// Route to get all products (alternative endpoint)
router.route('/products/all').get(getProducts);

// Admin route to get all products; requires user to be authenticated and have 'admin' role
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

// Admin route to create a new product; requires user to be authenticated and have 'admin' role
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// Admin routes for updating and deleting a specific product by ID; requires user to be authenticated and have 'admin' role
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// Route to get details of a single product by ID
router.route('/product/:id').get(getProductDetails);

// Route to create a product review; requires user to be authenticated
router.route('/review').put(isAuthenticatedUser, createProductReview);

// Admin route to get and delete product reviews; requires user to be authenticated
router.route('/admin/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

// Export the router to be used in other parts of the application
module.exports = router;
