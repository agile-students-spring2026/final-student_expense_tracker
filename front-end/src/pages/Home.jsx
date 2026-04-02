import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="land-page">
            <h2>Home</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", padding: "1rem 1rem" }}>
                <Link to="/expenses" className="land-home-card">
                    <div className="feat-label">TRACK</div>
                    <h3>Expenses</h3>
                </Link>
                <Link to="/budget" className="land-home-card">
                    <div className="feat-label">PLAN</div>
                    <h3>Budget</h3>
                </Link>
                <Link to="/profile" className="land-home-card">
                    <div className="feat-label">ACCOUNT</div>
                    <h3>Profile</h3>
                </Link>
                <Link to="/policies" className="land-home-card">
                    <div className="feat-label">INFO</div>
                    <h3>Policies</h3>
                </Link>
            </div>
        </div>
    )
}

export default Home;
