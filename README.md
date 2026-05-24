# Ecommerce API

This repository contains a MERN ecommerce backend with the following REST API endpoints.

## Base URL

- Local server: `http://localhost:5000`
- API prefix: `/api`

## Authentication

Protected routes require a JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

Register and login return a token to use for protected requests.

## User Endpoints

### Register User

- `POST /api/users/register`
- Body:
  - `name` (string, required)
  - `email` (string, required)
  - `password` (string, required)
- Response: user object with JWT token

### Login User

- `POST /api/users/login`
- Body:
  - `email` (string, required)
  - `password` (string, required)
- Response: user object with JWT token

### Get User Profile

- `GET /api/users/profile`
- Auth: required
- Response: user profile object

### Update User Profile

- `PUT /api/users/profile`
- Auth: required
- Body can include:
  - `name` (string)
  - `email` (string)
  - `password` (string)
- Response: updated user object with new token

## Product Endpoints

### Get Products

- `GET /api/products`
- Query params:
  - `page` (number) — default `1`
  - `limit` (number) — default `10`
  - `search` (string) — search product name
  - `category` (string) — filter by category ID
- Response: `{ products, page, pages }`

### Get Product by ID

- `GET /api/products/:id`
- Response: product object

### Create Product

- `POST /api/products`
- Auth: required, admin only
- Body:
  - `name` (string)
  - `description` (string)
  - `price` (number)
  - `category` (ObjectId)
  - `brand` (string)
  - `countInStock` (number)
  - `images` (array of strings)
- Response: created product object

### Update Product

- `PUT /api/products/:id`
- Auth: required, admin only
- Body can include any product fields to update
- Response: updated product object

### Delete Product

- `DELETE /api/products/:id`
- Auth: required, admin only
- Response: `{ message: 'Product removed.' }`

## Order Endpoints

### Create Order

- `POST /api/orders`
- Auth: required
- Body:
  - `orderItems` (array, required)
  - `shippingAddress` (object, required)
  - `paymentMethod` (string, required)
  - `itemsPrice` (number, required)
  - `shippingPrice` (number, required)
  - `taxPrice` (number, required)
  - `totalPrice` (number, required)
- Response: created order object

### Get Current User Orders

- `GET /api/orders/myorders`
- Auth: required
- Response: list of orders for the logged-in user

### Get Order by ID

- `GET /api/orders/:id`
- Auth: required
- Response: order object (user must own order or be admin)

### Update Order to Paid

- `PUT /api/orders/:id/pay`
- Auth: required
- Body can include payment result fields:
  - `id`
  - `status`
  - `update_time`
  - `email_address`
- Response: updated order object

### Update Order to Delivered

- `PUT /api/orders/:id/deliver`
- Auth: required, admin only
- Response: updated order object

### Get All Orders

- `GET /api/orders`
- Auth: required, admin only
- Response: list of all orders

## Notes

- Admin-only actions are protected by `protect` and `isAdmin` middleware.
- The server listens on port `5000` by default.
- Ensure `JWT_SECRET_KEY` and MongoDB connection variables are set in `.env`.
