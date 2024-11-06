# WickStore_API

### eCommerce API for WickStore

---

### **Table of Contents**

1. [Overview](#overview)
2. [Technologies and Dependencies](#technologies-and-dependencies)
3. [Installation and Setup](#installation-and-setup)
4. [API Documentation](#api-documentation)
5. [Usage Examples](#usage-examples)
6. [Project Structure](#project-structure)
7. [Testing](#testing)
8. [Future Improvements](#future-improvements)
9. [Contributing](#contributing)
10. [License](#license)

---

### 1. Overview

**WickStore_API** is a comprehensive backend API for an eCommerce platform. Built with Node.js, Express.js, and MongoDB, it provides robust endpoints for managing users, products, and orders. The API also includes secure authentication with JWT and media management via Cloudinary, making it suitable for scalable eCommerce applications.

### 2. Technologies and Dependencies

- **Core Technologies**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Media Storage**: Cloudinary
- **Environment Management**: dotenv
- **Other Libraries**: bcryptjs (for password hashing), express-validator (for input validation), mongoose (for MongoDB integration), nodemon (for development)

### 3. Installation and Setup

To get started, clone the repository and install the necessary dependencies.

#### Clone the repository

```bash
git clone https://github.com/kofilolx/wickStore_API.git
```

#### Navigate to the project directory and install dependencies

```bash
cd wickstore_mern
npm install
```

#### Run the server with Nodemon

```bash
nodemon server.js
```

#### Environment Variables

- Go to `backend/config` and edit the `.env` file with the following keys:
  - `PORT`: Port number (e.g., 4000)
  - `MONGODB_URI`: MongoDB connection URI
  - `JWT_SECRET`: Secret key for JWT token generation
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Cloudinary credentials for media storage

### 4. API Documentation

#### API Overview

- **Base URL**: `http://localhost:4000/api/v1`
- **Authentication**: Token-based, obtained via login endpoint.

#### Key Endpoints

**User Routes**

- **POST** `/api/v1/register` – Registers a new user.
- **POST** `/api/v1/login` – Logs in a user and returns a token.
- **GET** `/api/v1/logout` – Logs out the user.
- **GET** `/api/v1/me` – Retrieves authenticated user details.
- **PUT** `/api/v1/password/update` – Updates user password.

**Order Routes**

- **POST** `/api/v1/order/new` – Creates a new order (user-authenticated).
- **GET** `/api/v1/order/:id` – Fetches an order by ID (user-authenticated).
- **GET** `/api/v1/orders/me` – Fetches user’s orders (user-authenticated).
- **GET** `/api/v1/admin/orders` – Admin access: Fetches all orders.
- **PUT** `/api/v1/admin/order/:id` – Admin access: Updates an order by ID.
- **DELETE** `/api/v1/admin/order/:id` – Admin access: Deletes an order by ID.

**Product Routes**

- **GET** `/api/v1/products` – Fetches all products.
- **GET** `/api/v1/product/:id` – Fetches product details by ID.
- **POST** `/api/v1/admin/product/new` – Admin access: Creates a new product.
- **PUT** `/api/v1/admin/product/:id` – Admin access: Updates a product by ID.
- **DELETE** `/api/v1/admin/product/:id` – Admin access: Deletes a product by ID.

### 5. Usage Examples

#### Example 1: Register a New User

**Request**: `POST /api/v1/register`
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "gender": "male",
  "password": "password123"
}
```

**Response**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

#### Example 2: Retrieve All Products

**Request**: `GET /api/v1/products`

**Response**
```json
{
  "success": true,
  "products": [
    {
      "id": "1",
      "name": "Product Name",
      "price": 49.99,
      "category": "Category"
    },
  ]
}
```

### 6. Project Structure

```plaintext
wickstore_mern
├── backend
│   ├── app.js                  # Main app entry point
│   ├── config                  # Configuration files (e.g., .env)
│   ├── controllers             # Controllers for handling requests
│   ├── middlewares             # Custom middleware (e.g., authentication)
│   ├── models                  # Database models (User, Product, Order)
│   ├── routes                  # API routes
│   └── utils                   # Utility functions and helpers
└── README.md                   # Project documentation
```

### 7. Testing

- You can test the API endpoints using Postman by importing the endpoints and testing requests such as **POST /api/v1/register**, **GET /api/v1/products**, etc.
- Ensure each endpoint is tested thoroughly, checking for appropriate responses and error handling.

### 8. Future Improvements

- **Caching**: Implement Redis caching for frequently accessed resources (e.g., product listings).
- **Enhanced Documentation**: Expand API documentation with Swagger for interactive usage.
- **Additional Features**: Implement wish lists, advanced product search, and personalized recommendations.

### 9. Contributing

We welcome contributions! To get started:
1. Fork this repository.
2. Create a branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push your changes to the branch: `git push origin feature-name`.
5. Create a pull request.

### 10. License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---