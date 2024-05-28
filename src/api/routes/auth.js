const { register, login } = require('../controllers/auth');
  
  const authRoutes = require('express').Router();
  authRoutes.post('/register', register);
  authRoutes.post('/login', login);
  
  module.exports = authRoutes;