import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./AuthPages.css"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Please fill in all fields.")
            return
        }

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Login failed.")
            } else {
                localStorage.setItem("userId", data.userId)
                localStorage.setItem("userName", data.name)
                navigate("/home")
            }
        } catch (err) {
            setError("Server error. Try again later.")
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-top">
                    <div className="auth-logo">Track<span>r</span></div>
                    <h2>Welcome back</h2>
                    <p>Log in to your account</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
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
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="auth-btn">Log in</button>
                </form>

                <div className="auth-note">
                    No account? <Link to="/signup" className="auth-link">Sign up</Link>
                </div>
                <Link to="/" className="auth-back">← Back to home</Link>
            </div>
        </div>
    )
}

export default Login