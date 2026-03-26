import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="homeContainer">
            <h2 className="leftHeader">Home</h2>
            <div className="homeNav">
                <Link to="/expenses" className="homeNavCard">Expenses</Link>
                <Link to="/budget" className="homeNavCard">Budget</Link>
                <Link to="/profile" className="homeNavCard">Profile</Link>
            </div>
        </div>
    )
}

export default Home;
