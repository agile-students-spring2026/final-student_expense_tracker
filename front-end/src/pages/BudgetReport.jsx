import {useRef} from "react"
import { useNavigate } from "react-router-dom"
import jsPDF from "jspdf";
import html2canvas from "html2canvas"


function BudgetReport({ budget, expenses, currencySymbol = "$" }) {
    const reportRef = useRef(null);
    const navigate = useNavigate();

    async function handleDownloadPDF() {
        const element = reportRef.current;
        if (!element) return;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        let heightLeft = imgHeight;
        let pos = 0;
        pdf.addImage(imgData, "PNG", 0, pos, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
        while (heightLeft > 0) {
            pos -= pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, pos, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }
        pdf.save("budget-report.pdf");
    }

    const { incomeSources, fixedExpenses } = budget;

    const categoryTotals = Object.entries(
        expenses
            .filter(e => e.category && e.category.trim())
            .reduce((acc, e) => {
                const cat = e.category.trim();
                acc[cat] = (acc[cat] || 0) + parseFloat(e.amount || 0);
                return acc;
            }, {})
    );

    const totalIncome = incomeSources.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    const totalFixed = fixedExpenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
    const totalCategory = categoryTotals.reduce((sum, [, amt]) => sum + amt, 0);
    const netBalance = totalIncome - totalFixed - totalCategory;

    const highestFixed = fixedExpenses.length > 0
        ? fixedExpenses.reduce((max, e) => parseFloat(e.amount || 0) > parseFloat(max.amount || 0) ? e : max, fixedExpenses[0])
        : null;
    const highestCategory = categoryTotals.length > 0
        ? categoryTotals.reduce((max, cur) => cur[1] > max[1] ? cur : max)
        : null;

    const pct = (amt) => totalIncome > 0 ? ((amt / totalIncome) * 100).toFixed(1) + "%" : "—";

    const colHeader = { fontSize: "10px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" };

    return (
        <div className="land-page">
            <div style={{ display: "flex", justifyContent: "flex-start", padding: "1rem 0 0" }}>
                <button className="btn-green" onClick={() => navigate("/budget")}>← Back to Budgeting</button>
            </div>

            <div ref={reportRef}>
                <h2>Budget Report</h2>

                {/* Column headers */}
                <div style={{ display: "flex", padding: "0 1rem", marginBottom: "0.25rem" }}>
                    <div style={{ flex: 2, ...colHeader, textAlign: "left" }}>Name</div>
                    <div style={{ flex: 1, ...colHeader }}>Amount</div>
                    <div style={{ flex: 1, ...colHeader }}>% of Income</div>
                </div>

                <div className="land-section-label">Income</div>
                <div className="land-report-table">
                    {incomeSources.map((src, i) => (
                        <div key={i} className="land-report-row">
                            <div className="land-report-cell" style={{ flex: 2, textAlign: "left" }}>{src.name}</div>
                            <div className="land-report-cell">{currencySymbol}{parseFloat(src.amount).toFixed(2)}</div>
                            <div className="land-report-cell">{pct(parseFloat(src.amount))}</div>
                        </div>
                    ))}
                    <div className="land-report-total-row">
                        <div className="land-report-cell land-report-total" style={{ flex: 2, textAlign: "left" }}>Total:</div>
                        <div className="land-report-cell land-report-total">{currencySymbol}{totalIncome.toFixed(2)}</div>
                        <div className="land-report-cell land-report-total">100%</div>
                    </div>
                </div>

                <div className="land-section-label">Fixed Expenses</div>
                <div className="land-report-table">
                    {fixedExpenses.map((exp, i) => (
                        <div key={i} className="land-report-row">
                            <div className="land-report-cell" style={{ flex: 2, textAlign: "left" }}>{exp.name}</div>
                            <div className="land-report-cell">{currencySymbol}{parseFloat(exp.amount).toFixed(2)}</div>
                            <div className="land-report-cell">{pct(parseFloat(exp.amount))}</div>
                        </div>
                    ))}
                    <div className="land-report-total-row">
                        <div className="land-report-cell land-report-total" style={{ flex: 2, textAlign: "left" }}>Total:</div>
                        <div className="land-report-cell land-report-total">{currencySymbol}{totalFixed.toFixed(2)}</div>
                        <div className="land-report-cell land-report-total">{pct(totalFixed)}</div>
                    </div>
                </div>

                <div className="land-section-label">Category Expenses</div>
                <div className="land-report-table">
                    {categoryTotals.map(([name, amt], i) => (
                        <div key={i} className="land-report-row">
                            <div className="land-report-cell" style={{ flex: 2, textAlign: "left" }}>{name}</div>
                            <div className="land-report-cell">{currencySymbol}{amt.toFixed(2)}</div>
                            <div className="land-report-cell">{pct(amt)}</div>
                        </div>
                    ))}
                    <div className="land-report-total-row">
                        <div className="land-report-cell land-report-total" style={{ flex: 2, textAlign: "left" }}>Total:</div>
                        <div className="land-report-cell land-report-total">{currencySymbol}{totalCategory.toFixed(2)}</div>
                        <div className="land-report-cell land-report-total">{pct(totalCategory)}</div>
                    </div>
                </div>

                <div className="land-section-label">General Summary</div>
                <div className="land-summary-box">
                    <div className="land-summary-pair">
                        <p className="land-budget-total">Total Income: {currencySymbol}{totalIncome.toFixed(2)}</p>
                        <p className="land-budget-total">Total Expenses: {currencySymbol}{totalFixed.toFixed(2)}</p>
                    </div>
                    <p className="land-budget-total">Total Category Expenses: {currencySymbol}{totalCategory.toFixed(2)}</p>
                    <p className="land-budget-total">Net Balance: {currencySymbol}{netBalance.toFixed(2)}</p>
                    <p className="land-budget-total">Highest Fixed Expense: {highestFixed ? highestFixed.name : "—"}</p>
                    <p className="land-budget-total">Highest Category Expense: {highestCategory ? highestCategory[0] : "—"}</p>
                </div>
            </div>

            <div className="land-btn-row" style={{ marginTop: "1.5rem", flexDirection: "column", alignItems: "center" }}>
                <button className="btn-plain" onClick={handleDownloadPDF}>Download PDF</button>
            </div>
        </div>
    )
}

export default BudgetReport;