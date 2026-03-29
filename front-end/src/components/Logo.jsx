import { Link } from "react-router-dom"
import "./Logo.css"

function Logo() {
    return (
        <div className="logo-corner">
            <Link to="/home" className="logo-wordmark">
                Track<span>r</span>
            </Link>
        </div>
    )
}

export default Logo