import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddExpense({ setPendingExpense}) {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        category: "",
        details: ""
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newExpense = {
            id: Date.now(),
            name: formData.name,
            amount: formData.amount,
            category: formData.category.trim(),
            details: formData.details,
            dateAdded: new Date().toLocaleDateString()
        };

        setPendingExpense(newExpense);
        navigate("/expenses/confirm");
    }

    return (
        <div>
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" value ={formData.name} placeholder="Expense Name" onChange={handleChange}/>
                <input name="amount" value ={formData.amount} placeholder="Expense Amount" onChange={handleChange}/>
                <input name="category" value ={formData.category} placeholder="Category Name" onChange={handleChange}/>
                <textarea name="details" value ={formData.details} placeholder="Details" onChange={handleChange}/>
                <button type="submit">Add</button>
            </form>
            <div className="buttonWrap"><Link to="/expenses/confirm" className="linkbutton">Add</Link></div>
        </div>
    )
}

export default AddExpense;