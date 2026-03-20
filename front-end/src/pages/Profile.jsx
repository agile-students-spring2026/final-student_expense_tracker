import { Link } from "react-router-dom"
import PolicyFooter from "../components/PolicyFooter" 

function Profile() {
    return (
        <div>
            <h2>Profile</h2>
            <div className="buttonWrap"><Link to="/profile/edit" className="linkbutton">Edit Profile</Link></div>
            <div className="buttonWrap"><Link to="/" className="linkbutton">Logout</Link></div>
            <PolicyFooter/>
        </div>
    )
}

export default Profile;