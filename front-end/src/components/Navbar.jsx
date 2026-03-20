import { useState } from 'react'
import { Link } from "react-router-dom"

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav>
            <button onClick={() => {setMenuOpen(!menuOpen)}}>☰</button>
            
            { menuOpen &&(
                <div>
                    <Link to="/home">Home</Link>
                    <Link to="/expenses">Expenses</Link>
                    <Link to="/budget">Budget</Link>
                    <Link to="/profile">Profile</Link>
                </div>)}
        </nav>
    )
}

export default Navbar;