import { Link } from "react-router-dom"
import "./Landing.css"

function Landing() {
    return (
        <div className="land">

            <div className="hero">
                <div className="land-logo">Track<span>r</span></div>
                <div className="badge"><span className="badge-dot"></span>Free for students</div>
                <h1>Know where your<br />money <em>actually goes</em></h1>
                <p>Log expenses, set budgets, and build better money habits — simple enough for student life.</p>
                <div className="hero-btns">
                    <Link to="/signup" className="btn-green">Sign Up</Link>
                    <Link to="/login" className="btn-plain">Log in</Link>
                </div>
            </div>

            <div className="feats">
                <div className="feat">
                    <div className="feat-label">LOG</div>
                    <h3>Add fast</h3>
                    <p>Track any purchase in seconds with categories.</p>
                </div>
                <div className="feat">
                    <div className="feat-label">BUDGET</div>
                    <h3>Set limits</h3>
                    <p>Define spending caps and see what's left.</p>
                </div>
                <div className="feat">
                    <div className="feat-label">REVIEW</div>
                    <h3>See trends</h3>
                    <p>Monthly summaries of where your money goes.</p>
                </div>
            </div>

        </div>
    )
}

export default Landing