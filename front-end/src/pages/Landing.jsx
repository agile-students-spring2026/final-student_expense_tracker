import { Link } from "react-router-dom"
import "./Landing.css"

function Landing() {
    return (
        <div className="land">
            <nav className="landing-nav">
                <div className="landing-logo">Track<span className="r">r</span></div>
                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#pricing">Pricing</a>
                    <Link to="/signup" className="nav-cta">Sign up</Link>
                </div>
            </nav>

            <section className="landing-hero">
                <div className="hero-text">
                    <div className="badge reveal">Free for students</div>

                    <h1 className="reveal">
                        Know where your money <em>actually</em> goes
                    </h1>

                    <p className="subhead reveal">
                        Log expenses, set budgets, and build better money habits. Simple enough for student life.
                    </p>

                    <div className="cta-row reveal">
                        <Link to="/signup" className="btn btn-primary">Sign up</Link>
                        <Link to="/login" className="btn btn-secondary">Log in</Link>
                    </div>

                    <div className="footnote reveal">No credit card. Free with a .edu email.</div>
                </div>

                <div className="receipt-wrap reveal">
                    <div className="receipt">
                        <div className="receipt-stamp">Tracked</div>

                        <div className="receipt-header">
                            <div className="store">Trackr</div>
                            <div className="sub">Wed · Apr 29 · 11:42 AM</div>
                        </div>

                        <div className="receipt-line">
                            <span className="item">Iced oat latte</span>
                            <span className="dots"></span>
                            <span className="amt">$5.75</span>
                        </div>
                        <div className="receipt-line">
                            <span className="item">Bagel, everything</span>
                            <span className="dots"></span>
                            <span className="amt">$3.20</span>
                        </div>
                        <div className="receipt-line flagged">
                            <span className="item">↑ Coffee this wk</span>
                            <span className="dots"></span>
                            <span className="amt">$28.40</span>
                        </div>
                        <div className="receipt-line">
                            <span className="item">Subway swipe</span>
                            <span className="dots"></span>
                            <span className="amt">$2.90</span>
                        </div>
                        <div className="receipt-line">
                            <span className="item">Late-night halal</span>
                            <span className="dots"></span>
                            <span className="amt">$11.00</span>
                        </div>

                        <div className="receipt-divider"></div>

                        <div className="receipt-line">
                            <span className="item">Budget left</span>
                            <span className="dots"></span>
                            <span className="amt">$84.50</span>
                        </div>
                        <div className="receipt-total">
                            <span>April</span>
                            <span className="num">$315.50</span>
                        </div>

                        <div className="barcode">
                            {Array.from({ length: 20 }).map((_, index) => (
                                <span key={index}></span>
                            ))}
                        </div>
                        <div className="receipt-footer">
                            Thank you for tracking
                        </div>
                    </div>
                </div>
            </section>

            <section className="features" id="features">
                <div className="feature reveal">
                    <div className="feature-tag">Log</div>
                    <h3>Add fast</h3>
                    <p>Track any purchase in seconds with simple categories.</p>
                </div>
                <div className="feature reveal">
                    <div className="feature-tag">Budget</div>
                    <h3>Set limits</h3>
                    <p>Define spending caps and see what's left at a glance.</p>
                </div>
                <div className="feature reveal">
                    <div className="feature-tag">Review</div>
                    <h3>See trends</h3>
                    <p>Monthly summaries of where your money actually goes.</p>
                </div>
            </section>

            <footer className="landing-footer">
                <div>© 2026 Trackr</div>
                <div>
                    <a href="#privacy">Privacy</a>
                    <a href="#terms">Terms</a>
                    <a href="#contact">Contact</a>
                </div>
            </footer>
        </div>
    )
}

export default Landing
