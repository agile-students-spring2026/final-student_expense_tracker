import {useRef} from "react"
import jsPDF from "jspdf";
import html2canvas from "html2canvas"


function BudgetReport({ budget, expenses }) {
    const reportRef = useRef(null);

    async function handleDownloadPDF() {
        const element = reportRef.current;
        if (!element) return;
        const canvas = await html2canvas(element, {
            scale:2
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p","mm","a4");
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
        pdf.save("budget-report.pdf")
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

    return (
        <div className="land-page">
            <button className="budget-export" onClick={handleDownloadPDF}>Download PDF</button>
            <div ref={reportRef}>
            <h2>Budget Report</h2>

            <div className="land-section-label">Income</div>
            <div className="land-report-table">
                {incomeSources.map((src, i) => (
                    <div key={i} className="land-report-row">
                        <div className="land-report-cell">{src.name}</div>
                        <div className="land-report-cell">{src.amount}</div>
                        <div className="land-report-cell">{src.amount}</div>
                        <div className="land-report-cell">$0</div>
                    </div>
                ))}
                <div className="land-report-total-row">
                    <div className="land-report-cell land-report-total">Total:</div>
                    <div className="land-report-cell land-report-total">${totalIncome.toFixed(2)}</div>
                    <div className="land-report-cell land-report-total">${totalIncome.toFixed(2)}</div>
                    <div className="land-report-cell land-report-total">$0</div>
                </div>
            </div>

            <div className="land-section-label">Fixed Expenses</div>
            <div className="land-report-table">
                {fixedExpenses.map((exp, i) => (
                    <div key={i} className="land-report-row">
                        <div className="land-report-cell">{exp.name}</div>
                        <div className="land-report-cell">{exp.amount}</div>
                        <div className="land-report-cell">{exp.amount}</div>
                        <div className="land-report-cell">$0</div>
                    </div>
                ))}
                <div className="land-report-total-row">
                    <div className="land-report-cell land-report-total">Total:</div>
                    <div className="land-report-cell land-report-total">${totalFixed.toFixed(2)}</div>
                    <div className="land-report-cell land-report-total">${totalFixed.toFixed(2)}</div>
                    <div className="land-report-cell land-report-total">$0</div>
                </div>
            </div>

            <div className="land-section-label">Category Expenses</div>
            <div className="land-report-table">
                {categoryTotals.map(([name, amt], i) => (
                    <div key={i} className="land-report-row">
                        <div className="land-report-cell">{name}</div>
                        <div className="land-report-cell">${amt.toFixed(2)}</div>
                        <div className="land-report-cell">$0</div>
                        <div className="land-report-cell">-${amt.toFixed(2)}</div>
                    </div>
                ))}
                <div className="land-report-total-row">
                    <div className="land-report-cell land-report-total">Total:</div>
                    <div className="land-report-cell land-report-total">${totalCategory.toFixed(2)}</div>
                    <div className="land-report-cell land-report-total">$0</div>
                    <div className="land-report-cell land-report-total">-${totalCategory.toFixed(2)}</div>
                </div>
            </div>

            <div className="land-section-label">General Summary</div>
            <div className="land-summary-box">
                <div className="land-summary-pair">
                    <p className="land-budget-total">Total Income: ${totalIncome.toFixed(2)}</p>
                    <p className="land-budget-total">Total Expenses: ${totalFixed.toFixed(2)}</p>
                </div>
                <p className="land-budget-total">Total Category Expenses: ${totalCategory.toFixed(2)}</p>
                <p className="land-budget-total">Net Balance: ${netBalance.toFixed(2)}</p>
                <p className="land-budget-total">Highest Fixed Expense: {highestFixed ? highestFixed.name : ""}</p>
                <p className="land-budget-total">Highest Category Expense: {highestCategory ? highestCategory[0] : ""}</p>
            </div>
            </div>
        </div>
    )
}

export default BudgetReport;
