### API Documentation Structure

#### 1. **API Overview**
- **Title**: wickStore eCommerce API
- **Version**: v1.0
- **Base URL**: `http://localhost:4000/api/v1`
- **Description**: This API enables managing users, products, and orders for an eCommerce platform.

#### 2. **Authentication**
- **Type**: Token-based authentication.
- **How to Obtain Credentials**: Users need to register and log in to receive an authentication token.

#### 3. **Endpoints**

**User Routes**:
- **`POST /api/v1/register`**
  - **Description**: Registers a new user.
  - **Request Body**: 
    ```json
    {
      "name": "string",
      "email": "string",
      "gender": "string",
      "password": "string"
    }
    ```
  - **Response**: User registration confirmation (JSON).

- **`POST /api/v1/login`**
  - **Description**: Logs in a user.
  - **Request Body**: 
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**: User login confirmation (JSON) with a token.

- **`GET /api/v1/logout`**
  - **Description**: Logs out a user.

- **`GET /api/v1/me`**
  - **Description**: Retrieves details of the authenticated user.
  - **Response**: User details (JSON).

- **`PUT /api/v1/password/update`**
  - **Description**: Updates the user's password.
  - **Request Body**: 
    ```json
    {
      "currentPassword": "string",
      "newPassword": "string"
    }
    ```
  - **Response**: Password update confirmation (JSON).

**Order Routes**:
- **`POST /api/v1/order/new`**
  - **Description**: Creates a new order.
  - **Request Body**: Order details (JSON).
  - **Response**: Order confirmation (JSON).
  - **Authentication Required**: Yes.

- **`GET /api/v1/order/:id`**
  - **Description**: Retrieves details of a single order by ID.
  - **Response**: Order details (JSON).
  - **Authentication Required**: Yes.

- **`GET /api/v1/orders/me`**
  - **Description**: Fetches all orders placed by the authenticated user.
  - **Response**: List of orders (JSON).
  - **Authentication Required**: Yes.

- **`GET /api/v1/admin/orders`**
  - **Description**: Retrieves all orders (admin access).
  - **Response**: List of all orders (JSON).
  - **Authentication Required**: Yes (admin role).

- **`PUT /api/v1/admin/order/:id`**
  - **Description**: Updates an existing order by ID (admin access).
  - **Request Body**: Updated order details (JSON).
  - **Response**: Order update confirmation (JSON).
  - **Authentication Required**: Yes (admin role).

- **`DELETE /api/v1/admin/order/:id`**
  - **Description**: Deletes an existing order by ID (admin access).
  - **Response**: Order deletion confirmation (JSON).
  - **Authentication Required**: Yes (admin role).

**Product Routes**:
- **`GET /api/v1/products`**
  - **Description**: Retrieves all products.
  - **Response**: List of products (JSON).

- **`GET /api/v1/product/:id`**
  - **Description**: Retrieves details of a specific product by ID.
  - **Response**: Product details (JSON).

- **`POST /api/v1/admin/product/new`**
  - **Description**: Creates a new product (admin access).
  - **Request Body**: Product details (JSON).
  - **Response**: Product creation confirmation (JSON).
  - **Authentication Required**: Yes (admin role).

- **`PUT /api/v1/admin/product/:id`**
  - **Description**: Updates an existing product by ID (admin access).
  - **Request Body**: Updated product details (JSON).
  - **Response**: Product update confirmation (JSON).
  - **Authentication Required**: Yes (admin role).

- **`DELETE /api/v1/admin/product/:id`**
  - **Description**: Deletes an existing product by ID (admin access).
  - **Response**: Product deletion confirmation (JSON).
  - **Authentication Required**: Yes (admin role).

#### 4. **Data Models**

- **User Model**:
  - **Fields**:
    - `name`: String, required
    - `email`: String, required, unique
    - `gender`: String, required
    - `password`: String, required, minLength: 8
    - `role`: String, default: "user"

- **Product Model**:
  - **Fields**:
    - `name`: String, required
    - `description`: String, required
    - `price`: Number, required
    - `category`: String, required
    - `stock`: Number, required, default: 1

- **Order Model**:
  - **Fields**:
    - `shippingInfo`: Object, required
    - `orderItems`: Array of objects, required
    - `user`: ObjectId, ref: "User", required
    - `totalPrice`: Number, required, default: 0

