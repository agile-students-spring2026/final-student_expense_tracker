import crypto from "crypto";

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

export function hashPassword(password) {
    const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
    const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
    return `${salt}:${hash}`;
}

export function verifyPassword(password, storedPassword) {
    if (!storedPassword || !storedPassword.includes(":")) {
        return false;
    }

    const [salt, originalHash] = storedPassword.split(":");
    const hashBuffer = crypto.scryptSync(password, salt, KEY_LENGTH);
    const originalHashBuffer = Buffer.from(originalHash, "hex");

    if (hashBuffer.length !== originalHashBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(hashBuffer, originalHashBuffer);
}
