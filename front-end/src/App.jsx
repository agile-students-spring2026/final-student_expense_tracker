import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import AddExpense from "./pages/AddExpense.jsx"
import Budget from "./pages/Budget.jsx"
import BudgetReport from "./pages/BudgetReport.jsx"
import ConfirmExpense from "./pages/ConfirmExpense.jsx"
import CreateBudget from "./pages/CreateBudget.jsx"
import EditProfile from "./pages/EditProfile.jsx"
import ExpenseInfo from "./pages/ExpenseInfo.jsx"
import ExpenseList from "./pages/ExpenseList.jsx"
import ExpenseTracking from "./pages/ExpenseTracking.jsx"
import Home from "./pages/Home.jsx"
import Landing from "./pages/Landing.jsx"
import Login from "./pages/Login.jsx"
import Policies from "./pages/Policies.jsx"
import Profile from "./pages/Profile.jsx"
import Signup from "./pages/Signup.jsx"

import Navbar from "./components/Navbar.jsx"
import Logo from "./components/Logo.jsx"

import './App.css'

const NO_NAV_PAGES = ["/", "/login", "/signup"]

function AppContent({ expenses, setExpenses, pendingExpense, setPendingExpense, deleteExpense, deleteCategory }) {
  const location = useLocation()
  const showNav = !NO_NAV_PAGES.includes(location.pathname)

  return (
    <>
      {showNav && <Navbar />}
      {showNav && <Logo />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/expenses" element={<ExpenseTracking expenses={expenses} />} />
        <Route path="/expenses/list" element={<ExpenseList
          expenses={expenses}
          deleteExpense={deleteExpense}
          deleteCategory={deleteCategory}
        />} />
        <Route path="/expenses/add" element={<AddExpense setPendingExpense={setPendingExpense} />} />
        <Route path="/expenses/confirm" element={
          <ConfirmExpense
            pendingExpense={pendingExpense}
            expenses={expenses}
            setExpenses={setExpenses}
            setPendingExpense={setPendingExpense}
          />} />
        <Route path="/expenses/info/:id" element={<ExpenseInfo expenses={expenses} setExpenses={setExpenses} />} />

        <Route path="/budget" element={<Budget />} />
        <Route path="/budget/create" element={<CreateBudget />} />
        <Route path="/budget/report" element={<BudgetReport />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />

        <Route path="/policies" element={<Policies />} />
      </Routes>
    </>
  )
}

function App() {
  const [expenses, setExpenses] = useState([])
  const [pendingExpense, setPendingExpense] = useState(null)

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  function deleteCategory(categoryName) {
    setExpenses((prev) => prev.filter((expense) => expense.category !== categoryName))
  }

  return (
    <BrowserRouter>
      <AppContent
        expenses={expenses}
        setExpenses={setExpenses}
        pendingExpense={pendingExpense}
        setPendingExpense={setPendingExpense}
        deleteExpense={deleteExpense}
        deleteCategory={deleteCategory}
      />
    </BrowserRouter>
  )
}

export default App