import app from "./app.js";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"

dotenv.config();
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();
    } catch (err) {
        console.error("Initial database connection failed:", err.message);
    }

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer().catch((err) => {
    console.error("Server startup failed:", err.message);
});
