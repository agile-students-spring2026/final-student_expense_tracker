import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./AuthPages.css"

function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        setError("")
        if (!name || !email || !password || !confirm) {
            setError("Please fill in all fields.")
            return
        }
        if (password !== confirm) {
            setError("Passwords don't match.")
            return
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.")
            return
        }
        // TODO: connect to backend auth
        navigate("/home")
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-top">
                    <div className="auth-logo">Track<span>r</span></div>
                    
                    <h2>Sign up</h2>
                </div>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="name">Full name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Min. 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="confirm">Confirm password</label>
                        <input
                            id="confirm"
                            type="password"
                            placeholder="••••••••"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="auth-btn">Create account</button>
                </form>

                <div className="auth-note">
                    Already have an account? <Link to="/login" className="auth-link">Log in</Link>
                </div>
                <Link to="/" className="auth-back">← Back to home</Link>
            </div>
        </div>
    )
}

export default Signup