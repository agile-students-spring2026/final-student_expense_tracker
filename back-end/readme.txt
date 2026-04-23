# Trackr — Backend

The backend for **Trackr**, a student expense tracking app built with Node.js and Express.

---

## Tech Stack

- [Node.js](https://nodejs.org/) — runtime
- [Express](https://expressjs.com/) — web framework
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — database
- [Mongoose](https://mongoosejs.com/) — MongoDB object modeling
- [JWT](https://jwt.io/) — authentication
- [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/) — testing

---

## Building and Testing

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm
- A MongoDB Atlas account with a cluster set up

### Environment setup
Create a `.env` file in `back-end/server/` using the provided `.env.example`:

```bash
cp back-end/server/.env.example back-end/server/.env
```

Fill in your credentials:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
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

## Available API routes

| Method | Route | Auth required | Description |
|---|---|---|---|
| POST | `/api/signup` | No | Create a new user |
| POST | `/api/login` | No | Log in |
| POST | `/api/logout` | No | Log out |
| GET | `/api/expenses` | No | Get all expenses |
| POST | `/api/expenses` | No | Add an expense |
| PUT | `/api/expenses/:id` | No | Update an expense |
| DELETE | `/api/expenses/:id` | No | Delete an expense |
| DELETE | `/api/expenses/category/:name` | No | Delete a category |
| GET | `/api/budget` | Yes | Get user's budget |
| POST | `/api/budget` | Yes | Create/update budget |
| PUT | `/api/budget` | Yes | Update budget fields |
| DELETE | `/api/budget` | Yes | Reset budget |
| GET | `/api/profile/me` | Yes | Get current user profile |
| PUT | `/api/profile/me` | Yes | Update current user profile |
