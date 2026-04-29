import { NavLink } from "react-router-dom"

function Navbar({ sidebarOpen, setSidebarOpen }) {
    const navClass = ({ isActive }) => `navitem${isActive ? " active" : ""}`;
    const closeMobileDrawer = () => {
        if (window.innerWidth <= 768) {
            setSidebarOpen(false);
        }
    };
    const navLinks = (
        <>
            <span><NavLink to="/home" className={navClass} onClick={closeMobileDrawer}>Home</NavLink></span>
            <span><NavLink to="/expenses" className={navClass} onClick={closeMobileDrawer}>Expenses</NavLink></span>
            <span><NavLink to="/budget" className={navClass} onClick={closeMobileDrawer}>Budget</NavLink></span>
            <span><NavLink to="/profile" className={navClass} onClick={closeMobileDrawer}>Profile</NavLink></span>
            <span><NavLink to="/policies" className={navClass} onClick={closeMobileDrawer}>Policies</NavLink></span>
        </>
    );

    return (
        <>
            <button
                className="sidebar-toggle desktop-sidebar-toggle"
                type="button"
                aria-label="Toggle sidebar navigation"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen((open) => !open)}
            >
                ☰
            </button>

            <div className="mobile-app-nav">
                <button
                    className="mobile-nav-toggle"
                    type="button"
                    aria-label="Toggle navigation menu"
                    aria-expanded={sidebarOpen}
                    onClick={() => setSidebarOpen((open) => !open)}
                >
                    ☰
                </button>
                <NavLink to="/home" className="mobile-nav-logo" onClick={closeMobileDrawer}>
                    Track<span>r</span>
                </NavLink>
            </div>

            {sidebarOpen && <button className="mobile-nav-backdrop" type="button" aria-label="Close navigation menu" onClick={() => setSidebarOpen(false)}></button>}

            <nav className={`app-sidebar ${sidebarOpen ? "open" : "closed"}`}>
                <div>
                    {navLinks}
                </div>
            </nav>
        </>
    )
}

export default Navbar;
