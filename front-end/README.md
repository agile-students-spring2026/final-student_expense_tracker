# Trackr — Frontend

The frontend for **Trackr**, a student expense tracking app built with React and Vite.

---

## Our Features 

- **Expense Tracking** — Add, edit, and delete expenses with categories, amounts, and details
- **Receipt Scanning** — Scan a receipt photo and auto-fill expense fields using AI (OpenRouter vision model)
- **Category Management** — Group expenses into preset or custom categories, rename or delete categories
- **Budget Management** — Set income sources, fixed expenses, and track your spending split (Needs / Wants / Savings)
- **Customize Split** — Set your own budget split percentages with preset options and a minimum 10% savings rule
- **Budget Report** — View a full breakdown of income, fixed expenses, and category spending with % of income, downloadable as PDF
- **Expense Export** — Export all expenses to CSV
- **Expense Sorting & Search** — Sort by newest, oldest, A-Z, Z-A, highest, or lowest cost
- **User Auth** — Sign up and log in with JWT-based authentication
- **Profile Page** — View and manage your account settings

---

## Tech Stack

- [React](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — build tool and dev server
- [React Router](https://reactrouter.com/) — client-side routing
- [jsPDF](https://github.com/parallax/jsPDF) — PDF generation
- [html2canvas](https://html2canvas.hertzen.com/) — screenshot rendering for PDF export

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm
- Backend server running at `http://localhost:3000` (see backend README)

---

## Install & Run

### 1. Navigate to the frontend folder
```bash
cd front-end
```

### 2. Install all dependencies
```bash
npm install
```

This installs all required packages including:
- `react` + `react-dom`
- `react-router-dom`
- `vite`
- `jspdf`
- `html2canvas`
- `@vitejs/plugin-react`
- `eslint` + related plugins

### 3. Start the development server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

> **Note:** The backend must be running at `http://localhost:3000` for expenses, auth, budget, and receipt scanning to work. See the [backend README](../back-end/server/README.md) for setup instructions.

---

## Project Structure

```
front-end/
├── public/               # Static assets
└── src/
    ├── pages/            # Full page components
    │   ├── AddExpense.jsx
    │   ├── Budget.jsx
    │   ├── BudgetReport.jsx
    │   ├── ConfirmExpense.jsx
    │   ├── CreateBudget.jsx
    │   ├── CustomizeSplit.jsx
    │   ├── EditProfile.jsx
    │   ├── ExpenseInfo.jsx
    │   ├── ExpenseList.jsx
    │   ├── ExpenseTracking.jsx
    │   ├── Home.jsx
    │   ├── Landing.jsx
    │   ├── Login.jsx
    │   ├── Policies.jsx
    │   ├── Profile.jsx
    │   └── Signup.jsx
    ├── components/        # Shared/reusable components
    │   ├── Category.jsx
    │   ├── CategoryExpenseTable.jsx
    │   ├── ExpenseItem.jsx
    │   ├── ExpenseTable.jsx
    │   ├── Logo.jsx
    │   ├── Navbar.jsx
    │   └── PolicyFooter.jsx
    ├── App.jsx            # Root component, routes and global state
    ├── App.css            # Global styles
    └── index.css          # Base styles and CSS variables
```

---

## Scripts

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Lint code with ESLint
```