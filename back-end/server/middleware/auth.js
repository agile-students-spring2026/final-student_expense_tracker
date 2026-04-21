import jwt from "jsonwebtoken";

const DEFAULT_JWT_SECRET = "dev-jwt-secret";

export function requireAuth(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization token required." });
    }

    const token = authorization.slice("Bearer ".length).trim();

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || DEFAULT_JWT_SECRET);
        req.user = { id: payload.id };
        next();
    } catch {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
}
