import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PolicyFooter from "../components/PolicyFooter"

function Profile() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState({
        name: localStorage.getItem("userName") || "User",
        email: ""
    })
    const [error, setError] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (!token) { navigate("/login"); return }

        async function loadProfile() {
            try {
                const res = await fetch("https://trackr-jxdi.onrender.com/api/profile/me", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await res.json()
                if (!res.ok) {
                    setError(data.error || "Unable to load profile.")
                    if (res.status === 401) { localStorage.clear(); navigate("/login") }
                    return
                }
                setProfile({ name: data.name, email: data.email })
                localStorage.setItem("userId", data.id)
                localStorage.setItem("userName", data.name)
            } catch {
                setError("Unable to load profile.")
            }
        }
        loadProfile()
    }, [navigate])

    function handleLogout() {
        localStorage.clear()
        sessionStorage.clear()
        navigate("/")
    }

    const avatarLetter = profile.name?.trim()?.charAt(0)?.toUpperCase() || "U"

    return (
        <div className="land-page">
            <h2 style={{ textAlign: "center" }}>Profile</h2>

            <div className="edit-profile-header">
                <div className="edit-profile-avatar">{avatarLetter}</div>
                <h3 className="edit-profile-name">{profile.name}</h3>
                <p className="edit-profile-email">{profile.email || "No email available"}</p>
            </div>

            {error && <p style={{ color: "#e05454", textAlign: "center", fontSize: "0.85rem" }}>{error}</p>}

            <div className="land-form-card" style={{ margin: "0 1rem 1rem" }}>
                <p className="feat-label">ACCOUNT INFO</p>
                <div className="profile-settings-row">Username: {profile.name}</div>
                <div className="profile-settings-row">Email: {profile.email || "Unavailable"}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", padding: "0 1rem", marginTop: "1rem" }}>
                <button className="btn-green" onClick={() => navigate("/profile/edit")}>
                    Edit Profile
                </button>
                <button className="profile-logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <PolicyFooter />
        </div>
    )
}

export default Profile