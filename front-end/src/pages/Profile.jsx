import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PolicyFooter from "../components/PolicyFooter"

const CURRENCIES = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "CA$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
    { code: "BRL", symbol: "R$", name: "Brazilian Real" },
    { code: "MXN", symbol: "MX$", name: "Mexican Peso" },
    { code: "ZAR", symbol: "R", name: "South African Rand" },
    { code: "KRW", symbol: "₩", name: "South Korean Won" },
    { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
    { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
    { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
    { code: "SEK", symbol: "kr", name: "Swedish Krona" },
    { code: "DKK", symbol: "kr", name: "Danish Krone" },
    { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
    { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
    { code: "QAR", symbol: "﷼", name: "Qatari Riyal" },
    { code: "EGP", symbol: "£", name: "Egyptian Pound" },
    { code: "GHS", symbol: "₵", name: "Ghanaian Cedi" },
    { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
    { code: "TZS", symbol: "TSh", name: "Tanzanian Shilling" },
    { code: "PKR", symbol: "₨", name: "Pakistani Rupee" },
    { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
    { code: "PHP", symbol: "₱", name: "Philippine Peso" },
    { code: "THB", symbol: "฿", name: "Thai Baht" },
    { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
    { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
    { code: "VND", symbol: "₫", name: "Vietnamese Dong" },
    { code: "TWD", symbol: "NT$", name: "Taiwan Dollar" },
    { code: "PLN", symbol: "zł", name: "Polish Zloty" },
    { code: "CZK", symbol: "Kč", name: "Czech Koruna" },
    { code: "HUF", symbol: "Ft", name: "Hungarian Forint" },
    { code: "RON", symbol: "lei", name: "Romanian Leu" },
    { code: "TRY", symbol: "₺", name: "Turkish Lira" },
    { code: "RUB", symbol: "₽", name: "Russian Ruble" },
    { code: "UAH", symbol: "₴", name: "Ukrainian Hryvnia" },
    { code: "ILS", symbol: "₪", name: "Israeli Shekel" },
    { code: "CLP", symbol: "CLP$", name: "Chilean Peso" },
    { code: "COP", symbol: "COL$", name: "Colombian Peso" },
    { code: "PEN", symbol: "S/.", name: "Peruvian Sol" },
    { code: "ARS", symbol: "$", name: "Argentine Peso" },
    { code: "DZD", symbol: "دج", name: "Algerian Dinar" },
    { code: "MAD", symbol: "MAD", name: "Moroccan Dirham" },
    { code: "ETB", symbol: "Br", name: "Ethiopian Birr" },
];

function Profile({ setCurrencySymbol }) {
    const navigate = useNavigate()
    const [profile, setProfile] = useState({
        name: localStorage.getItem("userName") || "User",
        email: "",
        currencyPreference: "USD"
    })
    const [error, setError] = useState("")
    const [currencySuccess, setCurrencySuccess] = useState("")
    const [selectedCurrency, setSelectedCurrency] = useState("USD")

    // Password change state
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [passwordError, setPasswordError] = useState("")
    const [passwordSuccess, setPasswordSuccess] = useState("")
    const [savingPassword, setSavingPassword] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (!token) { navigate("/login"); return }

        async function loadProfile() {
            try {
                const response = await fetch("http://localhost:3000/api/profile/me", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await response.json()
                if (!response.ok) {
                    setError(data.error || "Unable to load profile.")
                    if (response.status === 401) { localStorage.clear(); navigate("/login") }
                    return
                }
                setProfile({ name: data.name, email: data.email, currencyPreference: data.currencyPreference || "USD" })
                setSelectedCurrency(data.currencyPreference || "USD")
                localStorage.setItem("userId", data.id)
                localStorage.setItem("userName", data.name)
            } catch {
                setError("Unable to load profile.")
            }
        }
        loadProfile()
    }, [navigate])

    async function handleSaveCurrency() {
        const token = localStorage.getItem("authToken")
        try {
            const res = await fetch("http://localhost:3000/api/profile/me", {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    name: profile.name,
                    email: profile.email,
                    currencyPreference: selectedCurrency
                })
            })
            const data = await res.json()
            if (!res.ok) { setError(data.error || "Could not save currency."); return }

            const currency = CURRENCIES.find(c => c.code === selectedCurrency)
            const symbol = currency?.symbol || "$"
            if (setCurrencySymbol) setCurrencySymbol(symbol)
            setCurrencySuccess("Currency saved!")
            setTimeout(() => setCurrencySuccess(""), 3000)
        } catch {
            setError("Could not save currency.")
        }
    }

    async function handlePasswordChange(e) {
        e.preventDefault()
        setPasswordError("")
        setPasswordSuccess("")
        setSavingPassword(true)
        const token = localStorage.getItem("authToken")
        try {
            const res = await fetch("http://localhost:3000/api/profile/me/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(passwordData)
            })
            const data = await res.json()
            if (!res.ok) { setPasswordError(data.error || "Could not update password."); return }
            setPasswordSuccess("Password updated successfully!")
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
            setShowPasswordForm(false)
            setTimeout(() => setPasswordSuccess(""), 3000)
        } catch {
            setPasswordError("Could not update password.")
        } finally {
            setSavingPassword(false)
        }
    }

    function handleLogout() {
        localStorage.clear()
        sessionStorage.clear()
        navigate("/")
    }

    const avatarLetter = profile.name?.trim()?.charAt(0)?.toUpperCase() || "U"

    return (
        <div className="land-page">
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "1rem" }}>
                <button className="btn-green" onClick={() => navigate("/home")}>← Back to Home</button>
            </div>

            <h2 style={{ textAlign: "center" }}>Profile</h2>

            <div className="edit-profile-header">
                <div className="edit-profile-avatar">{avatarLetter}</div>
                <h3 className="edit-profile-name">{profile.name}</h3>
                <p className="edit-profile-email">{profile.email || "No email available"}</p>
            </div>

            <hr className="edit-profile-divider" />

            {error && <p style={{ color: "#e05454", textAlign: "center", fontSize: "0.85rem" }}>{error}</p>}

            {/* Account Info */}
            <div className="profile-settings-section">
                <h3 className="profile-settings-title">Account Info</h3>
                <div className="profile-settings-row">Username: {profile.name}</div>
                <div className="profile-settings-row">Email: {profile.email || "Unavailable"}</div>
            </div>

            {/* Currency Preference */}
            <div className="profile-settings-section">
                <h3 className="profile-settings-title">Currency Preference</h3>
                <div style={{ padding: "0 1.5rem", display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                    <select
                        className="land-form-input"
                        value={selectedCurrency}
                        onChange={e => setSelectedCurrency(e.target.value)}
                        style={{ appearance: "auto", flex: 1, maxWidth: "300px" }}
                    >
                        {CURRENCIES.map(c => (
                            <option key={c.code} value={c.code}>
                                {c.code} — {c.name} ({c.symbol})
                            </option>
                        ))}
                    </select>
                    <button className="btn-green" onClick={handleSaveCurrency}>Save</button>
                </div>
                {currencySuccess && <p style={{ color: "#3db87a", fontSize: "0.85rem", padding: "0.5rem 1.5rem" }}>{currencySuccess}</p>}
            </div>

            {/* Password Change */}
            <div className="profile-settings-section">
                <h3 className="profile-settings-title">Password</h3>
                {!showPasswordForm ? (
                    <div style={{ padding: "0 1.5rem" }}>
                        <button className="btn-plain" onClick={() => setShowPasswordForm(true)}>Change Password</button>
                    </div>
                ) : (
                    <form onSubmit={handlePasswordChange} style={{ padding: "0 1.5rem" }}>
                        <div className="land-form-card" style={{ margin: "0.5rem 0" }}>
                            <label className="land-form-label">Current Password</label>
                            <input
                                className="land-form-input"
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={e => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            />
                            <label className="land-form-label">New Password</label>
                            <input
                                className="land-form-input"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={e => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            />
                            <label className="land-form-label">Confirm New Password</label>
                            <input
                                className="land-form-input"
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={e => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            />
                        </div>
                        {passwordError && <p style={{ color: "#e05454", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{passwordError}</p>}
                        {passwordSuccess && <p style={{ color: "#3db87a", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{passwordSuccess}</p>}
                        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                            <button className="btn-plain" type="button" onClick={() => { setShowPasswordForm(false); setPasswordError("") }}>Cancel</button>
                            <button className="btn-green" type="submit" disabled={savingPassword}>
                                {savingPassword ? "Saving..." : "Update Password"}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div className="expense-btn-center" style={{ marginTop: "2rem" }}>
                <button className="profile-logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <PolicyFooter />
        </div>
    )
}

export default Profile