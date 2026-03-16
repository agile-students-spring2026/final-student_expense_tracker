import { Link } from "react-router-dom"

function Signup() {
    return (
        <div>
            <h2>Sign Up</h2>
            <div className="buttonWrap"><Link to="/home" className="linkbutton">Create Account</Link></div>
            <div className="buttonWrap"><Link to="/" className="linkbutton">Back</Link></div>
        </div>
    )
}

export default Signup;