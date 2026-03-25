import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        sessionStorage.clear();
        setMenuOpen(false);
        navigate('/');
    }

    return (
        <nav>
            <button onClick={() => {setMenuOpen(!menuOpen)}}>☰</button>

            { menuOpen &&(
                <div>
                    <span><Link to="/home" className="navitem">Home</Link></span>
                    <span><Link to="/expenses" className="navitem">Expenses</Link></span>
                    <span><Link to="/budget" className="navitem">Budget</Link></span>
                    <span><Link to="/profile" className="navitem">Profile</Link></span>
                    <span><button onClick={handleLogout} className="navitem">Logout</button></span>
                </div>)}
        </nav>
    )
}

export default Navbar;