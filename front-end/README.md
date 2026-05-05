# Trackr — Frontend

The frontend for **Trackr**, an expense tracking app built with React and Vite.

---

## Features

- **Expense Tracking** — Add, edit, and delete expenses with categories, amounts, and details
- **Receipt Scanning** — Scan a receipt photo and auto-fill expense fields using AI (OpenRouter vision model)
- **Category Management** — Group expenses into preset or custom categories, rename or delete categories
- **Budget Management** — Set income sources, fixed expenses, and track your spending split (Needs / Wants / Savings)
- **Customize Split** — Set your own budget split percentages
- **Budget Report** — Full breakdown of income and spending, downloadable as PDF
- **Expense Export** — Export all expenses to CSV
- **Expense Sorting & Search** — Sort by newest, oldest, A-Z, Z-A, highest, or lowest cost
- **User Auth** — Sign up and log in with JWT-based authentication
- **Profile Page** — View and manage your account, currency preference, and password

---

## Tech Stack

- [React](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — build tool and dev server
- [React Router](https://reactrouter.com/) — client-side routing
- [jsPDF](https://github.com/parallax/jsPDF) — PDF generation
- [html2canvas](https://html2canvas.hertzen.com/) — screenshot rendering for PDF export

---

## Building and Testing

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm
- Backend server running (see [backend README](../back-end/server/README.md))

### Install dependencies
```bash
cd front-end
npm install
```

### Run the development server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

> **Note:** The backend must be running for expenses, auth, budget, and receipt scanning to work.

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

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
    │   ├── ExpenseInfo.jsx
    │   ├── ExpenseList.jsx
    │   ├── ExpenseTracking.jsx
    │   ├── Home.jsx
    │   ├── Landing.jsx
    │   ├── Login.jsx
    │   ├── Policies.jsx
    │   ├── Profile.jsx
    │   └── Signup.jsx
    ├── components/        # Shared components
    │   ├── Category.jsx
    │   ├── CategoryExpenseTable.jsx
    │   ├── ExpenseItem.jsx
    │   ├── ExpenseTable.jsx
    │   ├── Logo.jsx
    │   ├── Navbar.jsx
    │   └── PolicyFooter.jsx
    ├── App.jsx            # Root component, routes and global state
    ├── App.css            # Global styles
    └── index.css          # Base styles
```