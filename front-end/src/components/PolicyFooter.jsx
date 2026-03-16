import { useState } from 'react'
import { Link } from "react-router-dom"

function PolicyFooter() {

    return (
        <div> 
            <Link to="/policies" className="policybutton">Policy Footer</Link>
        </div>
    )
}

export default PolicyFooter;