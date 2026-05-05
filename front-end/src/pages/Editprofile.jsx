import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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
]

function EditProfile({ setCurrencySymbol }) {
    const navigate = useNavigate()

    const [profile, setProfile] = useState({ name: "", email: "" })
    const [selectedCurrency, setSelectedCurrency] = useState("USD")
    const [currencySuccess, setCurrencySuccess] = useState("")
    const [currencyError, setCurrencyError] = useState("")

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
                const res = await fetch("https://trackr-jxdi.onrender.com/api/profile/me", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await res.json()
                if (!res.ok) { navigate("/login"); return }
                setProfile({ name: data.name, email: data.email })
                setSelectedCurrency(data.currencyPreference || "USD")
            } catch {
                navigate("/login")
            }
        }
        loadProfile()
    }, [navigate])

    async function handleSaveCurrency() {
        setCurrencyError("")
        setCurrencySuccess("")
        const token = localStorage.getItem("authToken")
        try {
            const res = await fetch("https://trackr-jxdi.onrender.com/api/profile/me", {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    name: profile.name,
                    email: profile.email,
                    currencyPreference: selectedCurrency
                })
            })
            const data = await res.json()
            if (!res.ok) { setCurrencyError(data.error || "Could not save currency."); return }
            const currency = CURRENCIES.find(c => c.code === selectedCurrency)
            if (setCurrencySymbol) setCurrencySymbol(currency?.symbol || "$")
            setCurrencySuccess("Currency saved!")
            setTimeout(() => setCurrencySuccess(""), 3000)
        } catch {
            setCurrencyError("Could not save currency.")
        }
    }

    async function handlePasswordChange(e) {
        e.preventDefault()
        setPasswordError("")
        setPasswordSuccess("")
        setSavingPassword(true)
        const token = localStorage.getItem("authToken")
        try {
            const res = await fetch("https://trackr-jxdi.onrender.com/api/profile/me/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(passwordData)
            })
            const data = await res.json()
            if (!res.ok) { setPasswordError(data.error || "Could not update password."); return }
            setPasswordSuccess("Password updated!")
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
            setTimeout(() => setPasswordSuccess(""), 3000)
        } catch {
            setPasswordError("Could not update password.")
        } finally {
            setSavingPassword(false)
        }
    }

    return (
        <div className="land-page">
            <h2>Edit Profile</h2>

            {/* Currency */}
            <div className="land-form-card" style={{ margin: "0 1rem 1rem" }}>
                <p className="feat-label">CURRENCY PREFERENCE</p>
                <select
                    className="land-form-input"
                    value={selectedCurrency}
                    onChange={e => setSelectedCurrency(e.target.value)}
                    style={{ appearance: "auto" }}
                >
                    {CURRENCIES.map(c => (
                        <option key={c.code} value={c.code}>
                            {c.code} — {c.name} ({c.symbol})
                        </option>
                    ))}
                </select>
                {currencyError && <p style={{ color: "#e05454", fontSize: "13px", marginTop: "0.5rem" }}>{currencyError}</p>}
                {currencySuccess && <p style={{ color: "#3db87a", fontSize: "13px", marginTop: "0.5rem" }}>{currencySuccess}</p>}
                <div style={{ marginTop: "0.75rem" }}>
                    <button className="btn-green" onClick={handleSaveCurrency}>Save Currency</button>
                </div>
            </div>

            {/* Password */}
            <form onSubmit={handlePasswordChange}>
                <div className="land-form-card" style={{ margin: "0 1rem 1rem" }}>
                    <p className="feat-label">CHANGE PASSWORD</p>
                    <label className="land-form-label">Current Password</label>
                    <input
                        className="land-form-input"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={e => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    />
                    <label className="land-form-label" style={{ marginTop: "0.75rem" }}>New Password</label>
                    <input
                        className="land-form-input"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={e => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    />
                    <label className="land-form-label" style={{ marginTop: "0.75rem" }}>Confirm New Password</label>
                    <input
                        className="land-form-input"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={e => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                    {passwordError && <p style={{ color: "#e05454", fontSize: "13px", marginTop: "0.5rem" }}>{passwordError}</p>}
                    {passwordSuccess && <p style={{ color: "#3db87a", fontSize: "13px", marginTop: "0.5rem" }}>{passwordSuccess}</p>}
                </div>
                <div className="expense-btn-row" style={{ padding: "0 1rem", marginTop: "0.5rem" }}>
                    <button type="button" className="btn-plain" onClick={() => navigate("/profile")}>Cancel</button>
                    <button type="submit" className="btn-green" disabled={savingPassword}>
                        {savingPassword ? "Saving..." : "Update Password"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile