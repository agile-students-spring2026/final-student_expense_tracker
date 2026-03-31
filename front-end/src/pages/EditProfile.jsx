import { useState } from "react"
import { Link } from "react-router-dom"
import PolicyFooter from "../components/PolicyFooter" 

function EditProfile() {
    const [formData, setFormData] = useState({
        username: "Janedoe",
        email: "janedoe@email.com",
        password: "",
        confirmPassword: "",
        currency: "USD"
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match")
            return
        }

        console.log("Updated profile:", formData)
        alert("Profile updated!")
    }

    return (
        <div className="edit-profile-page">
            <h2 className="edit-profile-title">Edit Profile</h2>

            <div className="edit-profile-header">
                <div className="edit-profile-avatar">J</div>
                <h3 className="edit-profile-name">Janedoe</h3>
                <p className="edit-profile-email">janedoe@email.com</p>
            </div>

            <hr className="edit-profile-divider" />

            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>USERNAME</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>EMAIL</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label>NEW PASSWORD</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>CONFIRM PASSWORD</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>CURRENCY PREFERENCE</label>
                    <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                    >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                </div>

                <button className="edit-profile-button" type="submit">
                    Save Changes
                </button>
            </form>

            <PolicyFooter />
        </div>
    )
}

export default EditProfile;