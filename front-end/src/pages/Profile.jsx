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

        if (!token) {
            navigate("/login")
            return
        }

        async function loadProfile() {
            try {
                const response = await fetch("http://localhost:3000/api/profile/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const data = await response.json()

                if (!response.ok) {
                    setError(data.error || "Unable to load profile.")
                    if (response.status === 401) {
                        localStorage.clear()
                        sessionStorage.clear()
                        navigate("/login")
                    }
                    return
                }

                setProfile({
                    name: data.name,
                    email: data.email
                })
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
        <div className="edit-profile-page">
            <h2 className="edit-profile-title">Profile</h2>

            <div className="edit-profile-header">
                <div className="edit-profile-avatar">{avatarLetter}</div>
                <h3 className="edit-profile-name">{profile.name}</h3>
                <p className="edit-profile-email">{profile.email || "No email available"}</p>
            </div>

            <hr className="edit-profile-divider" />

            <div className="profile-settings-section">
                <h3 className="profile-settings-title">Account Settings</h3>

                {error && <div className="auth-error">{error}</div>}
                <div className="profile-settings-row">Username: {profile.name}</div>
                <div className="profile-settings-row">Email: {profile.email || "Unavailable"}</div>
                <div className="profile-settings-row">Password</div>
                <div className="profile-settings-row">Currency Preference</div>
            </div>

            <div className="expense-btn-center" style={{ marginTop: "1.5rem" }}>
                <button className="profile-logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <PolicyFooter />
        </div>
    )
}

export default Profile
