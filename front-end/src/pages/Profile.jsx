import { useNavigate } from "react-router-dom"
import PolicyFooter from "../components/PolicyFooter"

const USER = { name: "Janedoe", email: "janedoe @ email.com" }

function Profile() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        sessionStorage.clear()
        navigate("/")
    }

    return (
        <div className="profile-page">
            <h2 style={{ textAlign: "center", fontWeight: "bold", marginTop: "4rem" }}>Profile</h2>

            <div className="profile-avatar-wrap">
                <div className="profile-avatar">{USER.name.charAt(0)}</div>
            </div>

            <p className="profile-name">{USER.name}</p>
            <p className="profile-email">{USER.email}</p>

            <hr className="profile-divider" />

            <p className="profile-section-label">Account Settings</p>

            <div className="profile-field-row">Username</div>
            <div className="profile-field-row">Email</div>
            <div className="profile-field-row">Password</div>
            <div className="profile-field-row">Currency Preference</div>

            <hr className="profile-divider" />

            <div className="profile-logout-wrap">
                <button className="profile-logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <PolicyFooter />
        </div>
    )
}

export default Profile
