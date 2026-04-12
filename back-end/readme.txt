## Building and Testing

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm

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

### Available API routes

| Method | Route | Description |
|---|---|---|
| POST | `/api/signup` | Create a new user |
| POST | `/api/login` | Log in |
| POST | `/api/logout` | Log out |
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add an expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| DELETE | `/api/categories/:name` | Delete a category |
| GET | `/api/budget` | Get budget |
| POST | `/api/budget` | Create budget |
| PUT | `/api/budget` | Update budget |
| DELETE | `/api/budget` | Reset budget |