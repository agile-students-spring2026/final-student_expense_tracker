import { useState } from "react"
import { useNavigate } from "react-router-dom"

const PRESETS = [
    { label: "50 / 30 / 20", description: "Balanced (recommended)", needs: 50, wants: 30, savings: 20 },
    { label: "60 / 20 / 20", description: "Higher needs", needs: 60, wants: 20, savings: 20 },
    { label: "40 / 40 / 20", description: "More spending", needs: 40, wants: 40, savings: 20 },
    { label: "50 / 20 / 30", description: "Aggressive saving", needs: 50, wants: 20, savings: 30 },
]

function CustomizeSplit({ budget, setBudget }) {
    const navigate = useNavigate()

    const currentSplit = budget?.split || { needs: 50, wants: 30, savings: 20 }

    const [needs, setNeeds] = useState(currentSplit.needs)
    const [wants, setWants] = useState(currentSplit.wants)
    const [savings, setSavings] = useState(currentSplit.savings)
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    const total = Number(needs) + Number(wants) + Number(savings)
    const savingsNum = Number(savings)
    const savingsTooLow = savingsNum < 10

    function applyPreset(preset) {
        setNeeds(preset.needs)
        setWants(preset.wants)
        setSavings(preset.savings)
        setError("")
    }

    async function handleSave(e) {
        e.preventDefault()
        setError("")

        if (total !== 100) {
            setError("Percentages must add up to 100%.")
            return
        }
        if (savingsTooLow) {
            setError("Savings must be at least 10% — future you will thank you!")
            return
        }

        setSaving(true)
        try {
            const token = localStorage.getItem("authToken")
            const res = await fetch("http://localhost:3000/api/budget", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    split: {
                        needs: Number(needs),
                        wants: Number(wants),
                        savings: Number(savings)
                    }
                })
            })

            if (!res.ok) throw new Error("Failed to save split.")

            const updatedBudget = await res.json()
            setBudget(updatedBudget)
            navigate("/home")
        } catch (err) {
            setError("Failed to save. Try again.")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="land-page">
            <h2>Customize Split</h2>
            <p style={{ textAlign: "center", color: "#aaa", fontSize: "14px", marginBottom: "1.5rem" }}>
                Set how you want to divide your spendable income
            </p>

            {/* Preset suggestions */}
            <div style={{ margin: "0 1rem 1rem" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#3db87a", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                    Quick Presets
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {PRESETS.map((preset) => (
                        <button
                            key={preset.label}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            style={{
                                background: needs === preset.needs && wants === preset.wants && savings === preset.savings ? "#e6f5ec" : "#fff",
                                border: needs === preset.needs && wants === preset.wants && savings === preset.savings ? "1.5px solid #3db87a" : "1.5px solid #ede9e0",
                                borderRadius: "999px",
                                padding: "0.3rem 0.85rem",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: needs === preset.needs && wants === preset.wants && savings === preset.savings ? "#169246" : "#555",
                                cursor: "pointer",
                                fontFamily: "var(--sans)",
                                transition: "all 0.15s ease"
                            }}
                        >
                            {preset.label}
                            <span style={{ fontWeight: 400, color: "#aaa", marginLeft: "4px" }}>— {preset.description}</span>
                        </button>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSave}>
                <div className="land-form-card" style={{ margin: "0 1rem 1rem" }}>

                    <div style={{ marginBottom: "1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                            <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 7px", borderRadius: "20px", background: "#c3e8d4", color: "#0f6e56" }}>NEEDS</span>
                            <span style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>Fixed costs — rent, bills, essentials</span>
                        </div>
                        <input
                            type="number"
                            min="0" max="100"
                            value={needs}
                            onChange={e => { setNeeds(e.target.value); setError("") }}
                            className="land-form-input"
                            style={{ width: "100px" }}
                        />
                        <span style={{ fontSize: "13px", color: "#555", marginLeft: "8px" }}>%</span>
                    </div>

                    <div style={{ marginBottom: "1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                            <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 7px", borderRadius: "20px", background: "#c7d7f9", color: "#1a4ba8" }}>WANTS</span>
                            <span style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>Spending — food, fun, clothes</span>
                        </div>
                        <input
                            type="number"
                            min="0" max="100"
                            value={wants}
                            onChange={e => { setWants(e.target.value); setError("") }}
                            className="land-form-input"
                            style={{ width: "100px" }}
                        />
                        <span style={{ fontSize: "13px", color: "#555", marginLeft: "8px" }}>%</span>
                    </div>

                    <div style={{ marginBottom: "1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                            <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 7px", borderRadius: "20px", background: "#fde4a0", color: "#854f0b" }}>SAVINGS</span>
                            <span style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>Save it — don't touch!</span>
                        </div>
                        <input
                            type="number"
                            min="0" max="100"
                            value={savings}
                            onChange={e => { setSavings(e.target.value); setError("") }}
                            className="land-form-input"
                            style={{ width: "100px", borderColor: savingsTooLow ? "#e05454" : undefined }}
                        />
                        <span style={{ fontSize: "13px", color: "#555", marginLeft: "8px" }}>%</span>
                        {savingsTooLow && (
                            <p style={{ color: "#e05454", fontSize: "12px", marginTop: "4px" }}>
                                ⚠️ Minimum 10% savings recommended
                            </p>
                        )}
                    </div>

                    <div style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: total === 100 ? "#f0faf4" : "#fef2f2",
                        border: `1px solid ${total === 100 ? "#c3e8d4" : "#fca5a5"}`,
                        fontSize: "13px",
                        fontWeight: 600,
                        color: total === 100 ? "#0f6e56" : "#e05454"
                    }}>
                        Total: {total}% {total === 100 ? "✓" : "— must equal 100%"}
                    </div>

                    {error && <p style={{ color: "#e05454", fontSize: "13px", marginTop: "0.75rem" }}>{error}</p>}
                </div>

                <div className="expense-btn-row" style={{ padding: "0 1rem", marginTop: "1.5rem" }}>
                    <button type="button" className="btn-plain" onClick={() => navigate("/home")}>Cancel</button>
                    <button type="submit" className="btn-green" disabled={saving || total !== 100 || savingsTooLow}>
                        {saving ? "Saving..." : "Save Split"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CustomizeSplit