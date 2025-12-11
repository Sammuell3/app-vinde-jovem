import JWT from "jsonwebtoken";
// 1. O Porteiro (Verifica Token)
export const verifyToken = async (req, res, next) => {
  try {
    // O token geralmente vem no Header assim: "Bearer eyJhbGci..."
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Acesso negado! Token não informado." });
    }

    // Verifica a assinatura
    JWT.verify(token, process.env.JWT_SECRET || "secret", (err, decode) => {
      if (err) {
        return res.status(403).json({ message: "Token inválido ou expirado" });
      }

      // Se deu certo, salva os dados do usuario no request pra gente usar depois
      req.user = decode;
      next(); // Pode passar!
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. A Área VIP (Verifica se é Admin)
export const isAdmin = async (req, res, next) => {
  try {
    // Lembra que salvamos a role no token? Usamos ela aqui!
    if (req.user.role !== 1) {
      return res.status(403).json({ message: "Acesso restrito apenas para Admins" });
    }
    next(); // É admin, pode passar!
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};