import { useState } from 'react'
import { Link } from "react-router-dom"

function PolicyFooter() {
    return (
        <div className="policy-footer">
            <Link to="/policies" className="policy-link">
                Policies
            </Link>
        </div>
    )
}

export default PolicyFooter