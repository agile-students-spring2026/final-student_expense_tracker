import { Link } from "react-router-dom"
import PolicyFooter from "../components/PolicyFooter"

function Profile() {
    return (
        <div className="edit-profile-page">
            <h2 className="edit-profile-title">Profile</h2>

            <div className="edit-profile-header">
                <div className="edit-profile-avatar">J</div>
                <h3 className="edit-profile-name">Janedoe</h3>
                <p className="edit-profile-email">janedoe@email.com</p>
            </div>

            <hr className="edit-profile-divider" />

            <div className="profile-settings-section">
                <h3 className="profile-settings-title">Account Settings</h3>

                <div className="profile-settings-row">Username</div>
                <div className="profile-settings-row">Email</div>
                <div className="profile-settings-row">Password</div>
                <div className="profile-settings-row">Currency Preference</div>
            </div>

            <div className="expense-btn-center" style={{ marginTop: "1.5rem" }}>
                <Link to="/" className="profile-logout-btn">
                    Logout
                </Link>
            </div>

            <PolicyFooter />
        </div>
    )
}

export default Profile