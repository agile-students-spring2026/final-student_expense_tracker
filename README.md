# Trackr — Expense Tracker

Trackr is an expense tracking app that helps you log your spending, set budgets, and build smarter money habits, all in one place.

## Product Vision Statement

For anyone who wants to take control of their finances, Trackr is a simple and intuitive expense tracking app that makes it easy to monitor spending, manage budgets, and grow financial awareness.

---

## Core Team

| Name | GitHub |
|------|--------|
| Sean Alliman | [@seana12](https://github.com/seana12) |
| Chinwe Otti | [@chinweot](https://github.com/chinweot) |
| Nebiyu Ayele | [@nebiyu01](https://github.com/nebiyu01) |
| Shreya Dharayan | [@sd4994](https://github.com/sd4994) |
| Shuhan Ge | [@gshm446](https://github.com/gshm446) |

---

## About Trackr

Trackr started as a class project for an Agile Software Development and DevOps course at NYU. We wanted to build something that solved the problem of not being able to keep track of spending easily. Most budgeting apps can be overly complex. Trackr is different: it's clean, intuitive, and designed to work for anyone.

---

## Features

- **Expense Tracking** — Add, edit, and delete expenses with categories, amounts, and details
- **Receipt Scanning** — Scan a receipt photo and auto-fill expense fields using AI
- **Category Management** — Group expenses into preset or custom categories, rename or delete categories
- **Budget Management** — Set income sources, fixed expenses, and track your spending split (Needs / Wants / Savings)
- **Customize Split** — Set your own budget split percentages
- **Budget Report** — Full breakdown of income and spending with % of income, downloadable as PDF
- **Expense Export** — Export all expenses to CSV
- **Expense Sorting & Search** — Sort by newest, oldest, A-Z, Z-A, highest, or lowest cost
- **User Auth** — Sign up and log in with JWT-based authentication
- **Profile Page** — View and manage your account settings, currency preference, and password

---

## Tech Stack

**Frontend:** React, Vite, React Router, jsPDF, html2canvas
**Backend:** Node.js, Express, Multer, express-validator
**Database:** MongoDB Atlas (via Mongoose)
**Auth:** JWT + bcryptjs
**AI Receipt Scanning:** OpenRouter API (free vision model)

---

## Live Demo

- **Frontend:** https://trackr-frontend.onrender.com
- **Backend API:** https://trackr-jxdi.onrender.com

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account with a cluster set up
- A free [OpenRouter](https://openrouter.ai) API key (for receipt scanning)

### 1. Clone the repo
```bash
git clone https://github.com/agile-students-spring2026/final-student_expense_tracker
cd final-student_expense_tracker
```

### 2. Set up the backend
See the full backend setup instructions in the [backend README](back-end/server/README.md).

```bash
cd back-end/server
npm install
```

Create a `.env` file in `back-end/server/`:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
OPENROUTER_API_KEY=your_openrouter_key
```

```bash
npm run dev
```

Backend runs at `http://localhost:3000`.

### 3. Set up the frontend
See the full frontend setup instructions in the [frontend README](front-end/README.md).

```bash
cd front-end
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Project Structure

```
final-student_expense_tracker/
├── front-end/              # React + Vite frontend
│   └── src/
│       ├── pages/          # Page components
│       ├── components/     # Shared components
│       └── App.jsx         # Routes and global state
└── back-end/
    └── server/             # Express backend
        ├── models/         # Mongoose models
        ├── middleware/     # Auth middleware
        ├── validators/     # Request validators
        └── app.js          # Routes and server logic
```

---

## Contributing

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) document.

---

## Relevant Documents
- [UX Design & Wireframes](UX-DESIGN.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Frontend README](front-end/README.md)
- [Backend README](back-end/server/README.md)

---

## Links

- [Project Repository](https://github.com/agile-students-spring2026/final-student_expense_tracker)