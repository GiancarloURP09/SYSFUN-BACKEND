const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let token = req.header('Authorization');

  if (token) {
    // Eliminar "Bearer " del token si está presente
    if (token.startsWith('Bearer ')) {
      token = token.slice(7); // Eliminar los primeros 7 caracteres ("Bearer ")
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;
      next();
    } catch (error) {
      return res.status(400).json({ mensaje: 'Token inválido' });
    }
  } else {
    return res.status(401).json({ mensaje: 'Acceso denegado' });
  }
};

module.exports = authMiddleware;