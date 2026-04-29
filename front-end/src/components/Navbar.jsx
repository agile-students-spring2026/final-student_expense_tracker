import { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const navClass = ({ isActive }) => `navitem${isActive ? " active" : ""}`;

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
                    <span><NavLink to="/home" className={navClass}>Home</NavLink></span>
                    <span><NavLink to="/expenses" className={navClass}>Expenses</NavLink></span>
                    <span><NavLink to="/budget" className={navClass}>Budget</NavLink></span>
                    <span><NavLink to="/profile" className={navClass}>Profile</NavLink></span>
                    <span><NavLink to="/policies" className={navClass}>Policies</NavLink></span>
                </div>)}
        </nav>
    )
}

export default Navbar;
