# Trackr — Backend

The backend for **Trackr**, an expense tracking app built with Node.js and Express.

---

## Tech Stack

- [Node.js](https://nodejs.org/) — runtime
- [Express](https://expressjs.com/) — web framework
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — database
- [Mongoose](https://mongoosejs.com/) — MongoDB object modeling
- [JWT](https://jwt.io/) — authentication
- [Multer](https://github.com/expressjs/multer) — file/image upload handling
- [express-validator](https://express-validator.github.io/) — request validation
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — password hashing
- [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/) — testing

---

## Building and Testing

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm
- A MongoDB Atlas account with a cluster set up
- A free [OpenRouter](https://openrouter.ai) API key (for receipt scanning)

### Environment setup
Create a `.env` file in `back-end/server/`:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
OPENROUTER_API_KEY=your_openrouter_api_key
```

### Install dependencies
```bash
cd back-end/server
npm install
```

### Run the development server
```bash
npm run dev
```

Server runs at `http://localhost:3000`.

### Run tests
```bash
npm test
```

---

## Available API Routes

| Method | Route | Auth Required | Description |
|---|---|---|---|
| POST | `/api/signup` | No | Create a new user |
| POST | `/api/login` | No | Log in |
| POST | `/api/logout` | No | Log out |
| GET | `/api/expenses` | No | Get all expenses |
| POST | `/api/expenses` | No | Add an expense |
| PUT | `/api/expenses/:id` | No | Update an expense |
| DELETE | `/api/expenses/:id` | No | Delete an expense |
| PUT | `/api/expenses/category/:name` | No | Rename a category |
| DELETE | `/api/expenses/category/:name` | No | Delete a category and its expenses |
| POST | `/api/scan-receipt` | No | Scan a receipt image using AI |
| GET | `/api/budget` | Yes | Get user's budget |
| POST | `/api/budget` | Yes | Create/update budget |
| PUT | `/api/budget` | Yes | Update budget fields |
| DELETE | `/api/budget` | Yes | Reset budget |
| GET | `/api/profile/me` | Yes | Get current user profile |
| PUT | `/api/profile/me` | Yes | Update current user profile |
| PUT | `/api/profile/me/password` | Yes | Change password |
| GET | `/api/profile/:id` | No | Get profile by user ID |
| PUT | `/api/profile/:id` | No | Update profile by user ID |

---

## Project Structure

```
back-end/server/
├── config/         # Database connection
├── middleware/     # Auth middleware
├── models/         # Mongoose models (User, Expense, Budget, Profile)
├── validators/     # Request validators
├── utils/          # Password hashing utilities
├── test/           # Unit tests
├── app.js          # Express app and routes
└── server.js       # Entry point
```