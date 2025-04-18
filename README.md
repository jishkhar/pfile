# Trading Platform API

A RESTful API for a trading platform built with Next.js and MongoDB.

## Authentication

The API uses JWT (JSON Web Token) for authentication. Here's how to use it:

### Registration

To register a new user, send a POST request to `/api/auth/register` with the following body:

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

The response will include a JWT token that you should use for authenticated requests:

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "isEmailVerified": false,
      "kycStatus": "pending",
      "createdAt": "2024-03-15T10:30:00Z",
      "updatedAt": "2024-03-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Registration successful"
}
```

### Login

To log in, send a POST request to `/api/auth/login` with the following body:

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

The response will include a JWT token:

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "isEmailVerified": false,
      "kycStatus": "pending",
      "createdAt": "2024-03-15T10:30:00Z",
      "updatedAt": "2024-03-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

### Authenticated Requests

For authenticated requests, include the JWT token in the `Authorization` header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Get Current User Profile

To get the current user's profile, send a GET request to `/api/auth/me` with the JWT token in the `Authorization` header.

## API Routes

### Users

- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create a new user (admin only)
- `GET /api/users/:id` - Get a user by ID (admin only)
- `PATCH /api/users/:id` - Update a user (admin only)
- `DELETE /api/users/:id` - Delete a user (admin only)

### Assets

- `GET /api/assets` - Get all assets
- `POST /api/assets` - Create a new asset (admin only)
- `GET /api/assets/:id` - Get an asset by ID
- `PATCH /api/assets/:id` - Update an asset (admin only)
- `DELETE /api/assets/:id` - Delete an asset (admin only)

### Market Pairs

- `GET /api/market-pairs` - Get all market pairs
- `POST /api/market-pairs` - Create a new market pair (admin only)
- `GET /api/market-pairs/:id` - Get a market pair by ID
- `PATCH /api/market-pairs/:id` - Update a market pair (admin only)
- `DELETE /api/market-pairs/:id` - Delete a market pair (admin only)

### Orders

- `GET /api/orders` - Get all orders (authenticated)
- `POST /api/orders` - Create a new order (authenticated)
- `GET /api/orders/:id` - Get an order by ID (authenticated)
- `PATCH /api/orders/:id` - Update an order (authenticated)
- `DELETE /api/orders/:id` - Delete an order (authenticated)

### Positions

- `GET /api/positions` - Get all positions (authenticated)
- `POST /api/positions` - Create a new position (authenticated)
- `GET /api/positions/:id` - Get a position by ID (authenticated)
- `PATCH /api/positions/:id` - Update a position (authenticated)
- `DELETE /api/positions/:id` - Delete a position (authenticated)

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Start the development server: `npm run dev`

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation and verification
- `NODE_ENV` - Environment (development, production) 