const { isAuth, isAdmin } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const { updateUser, deleteUser, getUsers, updateUserRole, createEvent, confirmAttendance } = require('../controllers/user');
  
  const userRoutes = require('express').Router();
  userRoutes.get("/", [isAuth , isAdmin], getUsers);
  userRoutes.post("/events", [isAuth ], createEvent);
  userRoutes.post("/attendees/:eventId", [isAuth ], confirmAttendance);
  userRoutes.put('/avatar', [isAuth], upload.single('avatar'),updateUser);
  userRoutes.put('/auth/:id', [isAuth , isAdmin],updateUserRole);
  userRoutes.delete('/auth/:id', [isAuth, isAdmin], deleteUser);

 

  module.exports = userRoutes;