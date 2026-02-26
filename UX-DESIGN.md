# UX Design — Expense Tracker App

This document contains the app map and all wireframe diagrams for the Minimum Viable Product (MVP) of the Expense Tracker application. Wireframes are organized by section in logical navigation order.

---

## App Map
<img src="ux-design/Student Expense Tracker App - App Map.png" alt="App Map" width="1000">

The app is structured around four main sections accessible from the navigation menu, preceded by an onboarding flow for new and returning users.

---
## Prototype 
Mobile prototype link: [Figma Prototype](https://www.figma.com/proto/7yWqCcVscmOe9qnbFZPaC3/Student-Expense-Tracker-App---Wireframe?node-id=47-129&p=f&t=GGNZIUIjtlwsmozZ-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=47%3A129)

## Wireframe Diagrams
Wireframe Pages: [Figma Pages](https://www.figma.com/design/7yWqCcVscmOe9qnbFZPaC3/Student-Expense-Tracker-App---Wireframe?node-id=23-44&t=sJ3tzJiBZp4yVj7I-0)

---

## 0.0 — Onboarding

### 0.1 Landing Page

<img src="ux-design/0.1 Landing Page.png" alt="Landing Page wireframe" width="200">

The first screen a user sees when opening the app. Displays the app logo, app name, and a short tagline describing the app's purpose. Provides two navigation buttons: **Log In** for returning users and **Sign Up** for new users.

---

### 0.1.1 Log In

<img src="ux-design/0.1.1 Log In.png" alt="Log In wireframe" width="200">

Allows an existing user to authenticate into the app. The user enters their registered email address and password. A **Log In** button submits the form. A **Back** button returns the user to the Landing Page.

---

### 0.1.2 Sign Up

<img src="ux-design/0.1.2 Sign Up.png" alt="Sign Up wireframe" width="200">

Allows a new user to create an account. The user fills in their details (username, email, password, confirm password, currency preference). A **Back** button returns the user to the Landing Page.

---

## 1.0 — Home

### 1.0 Home

<img src="ux-design/1.0 Home.png" alt="Home wireframe" width="200">

The main dashboard screen shown after logging in. Displays a high-level summary of the user's financial activity including:

- A **short graphical data** placeholder showing visual spending trends
- Quick-view stats: Total Expense Amount, Number of Transactions, Budget Remaining, and Highlighted Category
- A **Balance** section with Balance Info and Balance Summary

The navigation menu (Expenses, Budget, Profile) is accessible from this screen and all main screens throughout the app.

---

## 2.0 — Expense Tracking

### 2.0 Expense Tracking

<img src="ux-design/2.0 Expense Tracking.png" alt="Expense Tracking wireframe" width="200">

A hub screen for the expense tracking section. Displays a quick **Overview** with three stat boxes: total number of expenses, number of categories, and total amount spent. A **Category Breakdown** shows each category with a proportional bar indicating relative spending. A **View Expense List** button navigates to the full expense list.

---

### 2.1 Expense List

<img src="ux-design/2.1 Expense List.png" alt="Expense List wireframe" width="200">

Displays all of the user's recorded expenses. The screen is divided into two sections:

- **Expenses** — a flat list of all expenses
- **Category Expenses** — expenses grouped by category, each with **Info** and **X** (delete) buttons

Tapping **Info** on any expense navigates to the Expense Info screen (2.3).

---

### 2.2 Add Expense

<img src="ux-design/2.2 Add Expense.png" alt="Add Expense wireframe" width="200">

A form screen for recording a new expense. Fields include:

- **Expense Name** — the name or description of the expense
- **Expense Amount** — the cost in the user's set currency
- **Category Name / Expense Category** — the category this expense belongs to
- **Details** — a free-text area for additional notes about the expense

An **Add** button submits the form and navigates to the Confirm screen (2.2.1).

---

### 2.2.1 Confirm Expense

<img src="ux-design/2.2.1 Confirm.png" alt="Confirm Expense wireframe" width="200">

An intermediate confirmation screen shown after filling out the Add Expense form. Displays a read-only summary of the expense details (name, amount, category, details) for the user to review before saving. A **Confirm** button saves the expense and returns to the Expense List. A **Cancel** button discards the entry and returns to the Expense List.

---

### 2.3 Expense Info

<img src="ux-design/2.3 Expense Info.png" alt="Expense Info wireframe" width="200">

A read-only detail view for a single expense. Shows the expense name, amount, category, and a details text area. An **Edit** button navigates to an editable version of the expense (same form as Add Expense, pre-populated with existing data).

---

## 3.0 — Budgeting

### 3.0 Budgeting

<img src="ux-design/3.0 Budgetting.png" alt="Budgeting wireframe" width="200">

The main budgeting hub screen. Displays the user's current budget broken into three sections:

- **Income** — income sources and their amounts, with a total
- **Fixed Expenses** — recurring fixed costs with a total
- **Category Expenses** — spending per category with a total
- **Summary** — a combined overview of income, expenses, and category expenses

A **Create New Budget** button at the top navigates to the Create Budget screen (3.1).

---

### 3.1 Create Budget

<img src="ux-design/3.1 Create Budget.png" alt="Create Budget wireframe" width="200">

A form for setting up a new budget. Divided into three sections:

- **Income Sources** — enter source name and amount; an **+ Add Another Source** button adds additional rows
- **Fixed Expenses** — enter expense name and amount; an **+ Add Another Expense** button adds additional rows
- **Budget Period** — a dropdown to select the period (e.g. Monthly)

A **Save Budget** button saves the budget and returns to the Budgeting screen. A **Cancel** button discards changes.

---

### 3.2 Budget Report

<img src="ux-design/3.2 Budget Report.png" alt="Budget Report wireframe" width="200">

A detailed financial report for the current budget period. Organised into four tables:

- **Income** — source name, amount, budgeted amount, and savings
- **Fixed Expenses** — expense name, amount, budgeted amount, and savings
- **Category Expenses** — category name, amount, budgeted amount, and savings
- **General Summary** — totals for income, expenses, category expenses, net balance, highest fixed expense, and highest category expense

---

## 4.0 — Profile

### 4.0 Profile

<img src="ux-design/4.0 Profile.png" alt="Profile wireframe" width="200">

Displays the user's profile information including their initial avatar, username, and email address. Divided into two sections:

- **Account Settings** — rows for Username, Email, Password, and Currency Preference; tapping any row navigates to the Edit Profile screen (4.1)
- **App** — links to Policies

A **Logout** button at the bottom logs the user out and returns them to the Landing Page.

---

### 4.1 Edit Profile

<img src="ux-design/4.1 Edit Profile.png" alt="Edit Profile wireframe" width="200">

A form for editing the user's account details. Displays the user's initial avatar. Editable fields include:

- Username
- Email
- New Password
- Confirm Password
- Currency Preference

---

## 5.0 — Policies

### 5.0 Policies

<img src="ux-design/5.0 Policies.png" alt="Policies wireframe" width="200">

A legal information screen accessible from the footer of most screens. Contains five sections displayed as placeholder text blocks:

1. Info We Collect
2. How We Use Your Data
3. Data Sharing
4. Your Rights
5. Contact Us

---

*End of UX Design Document*