import { Link } from "react-router-dom"

function Login() {
    return (
        <div>
            <h2>Log In</h2>
            <div className="buttonWrap"><Link to="/home" className="linkbutton">Log In</Link></div>
            <div className="buttonWrap"><Link to="/" className="linkbutton">Back</Link></div>
        </div>
    )
}

export default Login;