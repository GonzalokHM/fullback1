const { setError } = require('../../config/error');
const { deleteFile } = require('../../utils/deleteFile');
const User = require('../models/user');
const Event = require('../models/event');
const Attendee = require('../models/attendee');
const uploadToCloudinary = require('../../utils/UpCloudinary');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(setError(400, 'no users found'));
  }
};
const updateUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const oldUser = await User.findById(userId);

    if (!oldUser) {
      return next(setError(404, 'User not found'));
    }

    // Crear un nuevo objeto usuario con los datos antiguos y nuevos
    const newUser = {
      ...oldUser.toObject(),
      ...req.body,
    };

    if (req.file) {
      // Cambiar 'full_avatars' a cualquier otra carpeta para reutilizar el storage
      const result = await uploadToCloudinary(req.file.path, 'full_avatars');
      newUser.avatar = result.secure_url;
      if (oldUser.avatar) {
        deleteFile(oldUser.avatar);
      }
    }

    const userUpdated = await User.findByIdAndUpdate(userId, newUser, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(userUpdated);
  } catch (error) {
    return next(setError(400, "can't update Users 😱"));
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newRole } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { rol: newRole },
      { new: true }
    );

    if (!updatedUser) {
      return next(setError(404, 'User not found'));
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(setError(500, 'Error updating user role'));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    return res.status(200).json(deleteUser);
  } catch (error) {
    return next(setError(400, "can't delete Users 😱"));
  }
};

const createEvent = async (req, res, next) => {
  const { title, date, location, description } = req.body;
  const organizerId = req.user._id;
  try {
    const newEvent = new Event({ title, date, location, description, organizer: organizerId  });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    next (setError(500, 'Error creating event'));
  }
};

const confirmAttendance = async (req, res, next) => {
  const { eventId } = req.params;
  const { name, email } = req.user;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return next(setError(404, 'Event not found'));
    }
    // Busca si el asistente ya existe
    let attendee = await Attendee.findOne({ email });

    // Si no existe, crea un nuevo asistente
    if (!attendee) {
      attendee = new Attendee({
        name,
        email,
        events: [eventId],
      });
    } else {
      // Si existe, agrega el evento al array de eventos
      if (!attendee.events.includes(eventId)) {
        attendee.events.push(eventId);
      } else {
        return next(setError(400, 'Already confirmed attendance for this event'));
      }
    }

    await attendee.save();

    // Popula los eventos para devolver detalles completos
    // const populatedAttendee = await attendee.populate('events');
    const populatedAttendee = await Attendee.findById(attendee._id).populate('events');
    res.status(201).json(populatedAttendee);
  } catch (error) {
    next(setError(500, 'Error confirming attendance'));
  }
};

module.exports = {
  getUsers,
  updateUser,
  updateUserRole,
  deleteUser,
  createEvent,
  confirmAttendance,
};
