import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer xxx"

  if (!authHeader) {
    return res.status(401).json({ error: "Token não informado." });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Formato do token inválido." });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "JWT_SECRET não configurado." });
    }

    const decoded = jwt.verify(token, secret);

    const userId = decoded.userId;

    if (!userId) {
      return res.status(401).json({ error: "Token inválido (sem userId)." });
    }

    req.user = { id: userId };
    return next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}
