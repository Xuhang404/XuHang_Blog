import crypto from "crypto";

const getPassword = () => process.env.ADMIN_PASSWORD || "admin123";

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function validatePassword(password: string): boolean {
  return password === getPassword();
}

export const COOKIE_NAME = "admin_token";

export function createToken(password: string): string {
  return hashPassword(password);
}

export function verifyToken(token: string): boolean {
  return token === hashPassword(getPassword());
}
