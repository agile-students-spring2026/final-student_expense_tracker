import { Link } from "react-router-dom"

function Landing() {
    return (
        <div>
            <div>Logo</div>
            <h2>Track your expenses,manage your budget, stay in control!</h2>
            <div className="buttonWrap"><Link to="/login" className="linkbutton">Log In</Link></div>
            <div className="buttonWrap"><Link to="/signup" className="linkbutton">Sign Up</Link></div>
        </div>
    )
}

export default Landing;