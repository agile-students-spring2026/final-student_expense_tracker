import { NavLink } from "react-router-dom"

function Navbar({ sidebarOpen, setSidebarOpen }) {
    const navClass = ({ isActive }) => `navitem${isActive ? " active" : ""}`;

    return (
        <>
            <button
                className="sidebar-toggle"
                type="button"
                aria-label="Toggle sidebar navigation"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen((open) => !open)}
            >
                ☰
            </button>

            <nav className={`app-sidebar ${sidebarOpen ? "open" : "closed"}`}>
                <div>
                    <span><NavLink to="/home" className={navClass}>Home</NavLink></span>
                    <span><NavLink to="/expenses" className={navClass}>Expenses</NavLink></span>
                    <span><NavLink to="/budget" className={navClass}>Budget</NavLink></span>
                    <span><NavLink to="/profile" className={navClass}>Profile</NavLink></span>
                    <span><NavLink to="/policies" className={navClass}>Policies</NavLink></span>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
