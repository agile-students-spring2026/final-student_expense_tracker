import { useState, useEffect } from 'react'
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
import CustomizeSplit from "./pages/CustomizeSplit.jsx"
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

function AppContent({ expenses, setExpenses, pendingExpense, setPendingExpense, deleteExpense, deleteCategory, renameCategory, budget, setBudget }) {
  const location = useLocation()
  const showNav = !NO_NAV_PAGES.includes(location.pathname)
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      {showNav && <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
      {showNav && <Logo />}
      <main className={showNav ? `app-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}` : undefined}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home expenses={expenses} budget={budget} />} />
          <Route path="/expenses" element={<ExpenseTracking expenses={expenses} />} />
          <Route path="/budget/split" element={<CustomizeSplit budget={budget} setBudget={setBudget} />} />
          <Route path="/expenses/list" element={<ExpenseList
            expenses={expenses}
            deleteExpense={deleteExpense}
            deleteCategory={deleteCategory}
            renameCategory={renameCategory}
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
          <Route path="/budget" element={<Budget budget={budget} expenses={expenses} />} />
          <Route path="/budget/create" element={<CreateBudget key={JSON.stringify(budget)} budget={budget} setBudget={setBudget} />} />
          <Route path="/budget/report" element={<BudgetReport budget={budget} expenses={expenses} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/policies" element={<Policies />} />
        </Routes>
      </main>
    </>
  )
}

function App() {
  const [expenses, setExpenses] = useState([])
  const [pendingExpense, setPendingExpense] = useState(null)
  const [budget, setBudget] = useState({ incomeSources: [], fixedExpenses: [], period: "Monthly" })

  useEffect(() => {
    async function loadExpenses() {
      try {
        const res = await fetch("http://localhost:3000/api/expenses");
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        console.log("Failed to load expenses:",err);
      }
    }
    loadExpenses();
  }, []);

  useEffect(() => {
    async function loadBudget() {
      try {
        const token = localStorage.getItem("authToken")
        const res = await fetch("http://localhost:3000/api/budget", {
          headers: {"Authorization":`Bearer ${token}`}
          })
        const data = await res.json();
        setBudget(data);
      } catch (err) {
        console.log("Failed to load budget:",err);
      }
    }
    loadBudget();
  }, []);

  async function deleteExpense(id) {
    const confirmed = window.confirm("Delete this expense?")
    if (!confirmed) return;
    try {
      await fetch(`http://localhost:3000/api/expenses/${id}`, {
        method: "DELETE"
      })

      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  }

  async function renameCategory(oldCategoryName, newCategoryName) {
    try { 
      const res = await fetch(
        `http://localhost:3000/api/expenses/category/${encodeURIComponent(oldCategoryName)}`,
        {
          method:"PUT",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({newCategoryName})
        }
      );

      if (!res.ok) {
        throw new Error(`Rename faild: ${res.status}`);
      }

      setExpenses((prev) =>
        prev.map((expense) =>
          expense.category === oldCategoryName
            ? {...expense, category: newCategoryName.trim()}
            : expense
        ));
    } catch(err) {
      console.error("Failed to rename category:", err);
    }
  }

  async function deleteCategory(categoryName) {
    const confirmed = window.confirm(`Delete the ${categoryName} category, and its expenses?`)
    if (!confirmed) return;
    try {
      await fetch(`http://localhost:3000/api/expenses/category/${encodeURIComponent(categoryName)}`, {
        method: "DELETE"
      })
      setExpenses((prev) => prev.filter((expense) => expense.category !== categoryName));
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
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
        renameCategory={renameCategory}
        budget={budget}
        setBudget={setBudget}
      />
    </BrowserRouter>
  )
}

export default App
