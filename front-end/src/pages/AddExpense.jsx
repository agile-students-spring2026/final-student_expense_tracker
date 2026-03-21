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
                <div className="formContainer">
                        <label >Expense Name</label>
                        <input name="name" value ={formData.name} placeholder="Expense Name" onChange={handleChange}/>
                    </div>
                    <div className="formContainer">
                        <label>Expense Amount</label>
                        <input name="amount" value ={formData.amount} placeholder="Expense Amount" onChange={handleChange}/>
                    </div>
                    <div className="formContainer">
                        <label>Expense Category</label>
                        <input name="category" value ={formData.category} placeholder="Category Name" onChange={handleChange}/>
                    </div>
                    <div className="formContainer">
                        <label>Details</label>
                        <textarea name="details" value ={formData.details} placeholder="Details" onChange={handleChange}/>
                    </div>
                    <div className="formButtonContainer">
                        <button className="linkbutton" type="submit">Add</button>
                    </div>
            

            </form>
        </div>
    )
}

export default AddExpense;