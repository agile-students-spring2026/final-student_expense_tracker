import ExpenseItem from "./ExpenseItem"

function Category({ categoryName, expenses, deleteExpense, deleteCategory }) {
    return (
        <div>
            <div className="expense-category-name-row">
  {categoryName}
  <button 
    className="expense-category-x-btn" 
    onClick={() => deleteCategory(categoryName)}
  >
    X
  </button>
</div>
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    deleteExpense={deleteExpense}
                />
            ))}
        </div>
    )
}

export default Category;
