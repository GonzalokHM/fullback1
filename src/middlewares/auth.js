const User = require('../api/models/user');
const { setError } = require('../config/error');
const { verifyJwt } = require('../config/jwt');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      console.log('notoken');
      return next(setError(400, 'te has columpiado, acceso privado'));
    }

    const parsedToken = token.replace('Bearer', '').trim();
    const { id } = verifyJwt(parsedToken);
    const userLogued = await User.findById(id);

    userLogued.password = null;
    req.user = userLogued;

    next();
  } catch (error) {
    return next(setError(400, 'llave incorrecta'));
  }
};
const isAdmin = async (req, res, next) => {
  if (!req.user) {
    return next(setError(401, 'No autenticado'));
  }

  if (req.user.rol !== 'admin') {
    return next(setError(403, 'Esta acción sólo la pueden realizar los administradores'));
  }

  next();
};

module.exports = { isAuth , isAdmin};
