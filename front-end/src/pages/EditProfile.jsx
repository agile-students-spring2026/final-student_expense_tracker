import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PolicyFooter from "../components/PolicyFooter"

function EditProfile() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        currencyPreference: "USD"
    })

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (!token) {
            navigate("/login")
            return
        }

        async function loadProfile() {
            try {
                const res = await fetch("http://localhost:3000/api/profile/me", {
                    headers: { Authorization: `Bearer ${token}` }
                })

                const data = await res.json()

                if (!res.ok) {
                    setError(data.error || "Unable to load profile.")
                    return
                }

                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    currencyPreference: data.currencyPreference || "USD"
                })
            } catch {
                setError("Unable to load profile.")
            } finally {
                setLoading(false)
            }
        }

        loadProfile()
    }, [navigate])

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setSuccess("")
        setSaving(true)

        if (!formData.name.trim()) {
            setError("Username is required.")
            setSaving(false)
            return
        }

        const token = localStorage.getItem("authToken")

        try {
            const res = await fetch("http://localhost:3000/api/profile/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Could not update profile.")
                return
            }

            localStorage.setItem("userName", data.name || formData.name)
            setSuccess("Profile updated successfully!")

            setTimeout(() => {
                navigate("/profile")
            }, 800)
        } catch {
            setError("Could not update profile.")
        } finally {
            setSaving(false)
        }
    }

    const avatarLetter = formData.name?.trim()?.charAt(0)?.toUpperCase() || "U"

    if (loading) {
        return (
            <div className="edit-profile-page">
                <h2 className="edit-profile-title">Edit Profile</h2>
                <p style={{ textAlign: "center" }}>Loading profile...</p>
            </div>
        )
    }

    return (
        <div className="edit-profile-page">
            <button className="btn-green" onClick={() => navigate("/profile")}>
                ← Back to Profile
            </button>

            <h2 className="edit-profile-title">Edit Profile</h2>

            <div className="edit-profile-header">
                <div className="edit-profile-avatar">{avatarLetter}</div>
                <h3 className="edit-profile-name">{formData.name}</h3>
                <p className="edit-profile-email">{formData.email}</p>
            </div>

            <hr className="edit-profile-divider" />

            {error && <p style={{ color: "#e05454", textAlign: "center" }}>{error}</p>}
            {success && <p style={{ color: "#3db87a", textAlign: "center" }}>{success}</p>}

            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>USERNAME</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
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
                    <label>CURRENCY PREFERENCE</label>
                    <select
                        name="currencyPreference"
                        value={formData.currencyPreference}
                        onChange={handleChange}
                    >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                        <option value="INR">INR - Indian Rupee</option>
                    </select>
                </div>

                <button className="edit-profile-button" type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </form>

            <PolicyFooter />
        </div>
    )
}

export default EditProfile