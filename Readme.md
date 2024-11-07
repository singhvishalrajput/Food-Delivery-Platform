# E-Commerce Food Ordering System

An e-commerce platform for managing food items, user carts, orders, and payments. This application allows users to view food items, add them to their cart, place orders, and make payments via Stripe. The backend is built using Express.js and MongoDB, with JWT-based authentication for secure access.

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Documentation](#api-documentation)
  - [User Routes](#user-routes)
  - [Food Routes](#food-routes)
  - [Cart Routes](#cart-routes)
  - [Order Routes](#order-routes)
- [Middleware](#middleware)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)

---

## Features

- **User Authentication**: Users can register, log in, and access protected routes with JWT token-based authentication.
- **Food Management**: Admins can add, list, and remove food items, including images.
- **Cart Management**: Users can add/remove items to/from their cart and view cart details.
- **Order Management**: Users can place orders, and admins can view and update order statuses.
- **Stripe Integration**: Users can make payments for their orders via Stripe.
- **JWT Authentication**: Middleware ensures only authenticated users can access cart and order management routes.

---

## Technologies Used

- **Node.js** - Backend framework for building the server.
- **Express.js** - Web framework for handling HTTP requests.
- **MongoDB** - Database for storing food items, user data, cart information, and orders.
- **JWT** - JSON Web Tokens for user authentication.
- **Multer** - Middleware for handling image uploads.
- **Stripe** - Payment gateway for processing payments.
- **dotenv** - For managing environment variables.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/food-ordering-system.git
   ```

2. Navigate into the project directory:
   ```bash
   cd food-ordering-system
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   MONGO_URI=your_mongo_connection_string
   ```

5. Start the server:
   ```bash
   npm start
   ```

The server should now be running on `http://localhost:5000`.

---

## API Documentation

### User Routes

- **POST /api/users/register**  
  Register a new user with name email and password.
  
  **Request Body:**
  ```json
  {
    "name":"username",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST /api/users/login**  
  Log in an existing user and receive a JWT token.
  
  **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

  **Response:**
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

### Food Routes

- **POST /api/foods/add**  
  Add a new food item (Admin only). Requires a food image and other details.
  
  **Request Body (FormData):**
  ```json
  {
    "name": "Pizza",
    "description": "Delicious cheese pizza",
    "price": 12.99,
    "category": "Italian"
  }
  ```

- **GET /api/foods/list**  
  List all food items.

- **POST /api/foods/remove**  
  Remove a food item by ID (Admin only).
  
  **Request Body:**
  ```json
  {
    "foodId": "food_id_here"
  }
  ```

### Cart Routes

- **POST /api/cart/add**  
  Add a food item to the cart. Requires user authentication.
  
  **Request Body:**
  ```json
  {
    "foodId": "food_id_here",
    "quantity": 2
  }
  ```

- **POST /api/cart/remove**  
  Remove a food item from the cart. Requires user authentication.
  
  **Request Body:**
  ```json
  {
    "foodId": "food_id_here"
  }
  ```

- **POST /api/cart/get**  
  Get the current user's cart details.

### Order Routes

- **POST /api/orders/place**  
  Place a new order. Requires user authentication.
  
  **Request Body:**
  ```json
  {
    "cartId": "cart_id_here",
    "shippingAddress": "123 Street, City",
    "paymentMethod": "stripe"
  }
  ```

- **GET /api/orders/list**  
  List all orders (Admin only).

- **POST /api/orders/status**  
  Update the status of an order (Admin only).
  
  **Request Body:**
  ```json
  {
    "orderId": "order_id_here",
    "status": "Shipped"
  }
  ```

---

## Middleware

- **authMiddleware.js**  
  Protects routes that require authentication by verifying JWT tokens passed in the request headers.

```js
const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
```

---

## Running the Project

To run the project locally:

1. Follow the **Installation** steps to set up the environment.
2. Start the server:
   ```bash
   npm start
   ```
3. The backend will run on `http://localhost:5000`.

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature/feature-name`).
5. Create a new Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
