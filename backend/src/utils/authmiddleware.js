const { verifyJWT } = require("./jwt");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "token não fornecido" });
  }

  const token = authHeader.slice(7);

  try {
    const payload = verifyJWT(token, process.env.JWT_SECRET || "SECRET");
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}

module.exports = { authMiddleware };
