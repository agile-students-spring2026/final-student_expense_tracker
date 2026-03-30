import { Link } from "react-router-dom"
import PolicyFooter from "../components/PolicyFooter"

function Policies() {
    return (
        <div className="policies-page">
            <h2 className="policies-title">Policies</h2>
            <hr className="policies-divider" />

            <div className="policies-section">
                <h3>1. Info We Collect</h3>
                <div className="policies-text-box">
                    We collect basic account information such as your username,
                    email address, and any expense data you enter into the app.
                </div>
                <div className="policies-text-box">
                    This may include expense names, amounts, dates, categories,
                    and profile preferences.
                </div>
            </div>

            <div className="policies-section">
                <h3>2. How We Use Your Data</h3>
                <div className="policies-text-box">
                    Your information is used to help display your expenses,
                    organize your categories, and support budget tracking
                    features inside the application.
                </div>
                <div className="policies-text-box">
                    We use profile settings to personalize your experience and
                    improve app functionality.
                </div>
            </div>

            <div className="policies-section">
                <h3>3. Data Sharing</h3>
                <div className="policies-text-box">
                    We do not sell or share your personal information with third
                    parties.
                </div>
                <div className="policies-text-box">
                    Your data remains within the application and is only used
                    for account and expense tracking purposes.
                </div>
            </div>

            <div className="policies-section">
                <h3>4. Your Rights</h3>
                <div className="policies-text-box">
                    You may update your account details and expense information
                    at any time through the app.
                </div>
                <div className="policies-text-box">
                    You may also request removal of your data if account
                    deletion is supported by the platform.
                </div>
            </div>

            <div className="policies-section">
                <h3>5. Contact Us</h3>
                <div className="policies-text-box">
                    If you have questions or concerns about these policies,
                    please contact the development team for support.
                </div>
            </div>

            <PolicyFooter />
        </div>
    )
}

export default Policies;