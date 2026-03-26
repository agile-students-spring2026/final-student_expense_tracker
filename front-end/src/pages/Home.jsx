import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="homeContainer">
            <h2 className="leftHeader">Home</h2>
            <div className="homeNav">
                <Link to="/expenses" className="homeNavCard">
                    <h3>Expenses</h3>
                    <p>Track and manage your expenses</p>
                </Link>
                <Link to="/budget" className="homeNavCard">
                    <h3>Budget</h3>
                    <p>Create and view your budget</p>
                </Link>
                <Link to="/profile" className="homeNavCard">
                    <h3>Profile</h3>
                    <p>View and edit your profile</p>
                </Link>
            </div>
        </div>
    )
}

export default Home;
