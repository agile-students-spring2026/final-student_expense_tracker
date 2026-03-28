import ExpenseItem from "./ExpenseItem"

function Category({ categoryName, expenses, deleteExpense, deleteCategory }) {
    return (
        <div>
            <button className="expense-category-x-btn" onClick={() => deleteCategory(categoryName)}>X</button>
            <div className="expense-category-name-row">{categoryName}</div>
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
