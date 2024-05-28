const { connectDB } = require('../../config/db');
const User = require('../models/user');
const Event = require('../models/event');
const Attendee = require('../models/attendee');
const seed = require('./seedData');
connectDB();

const cleanCollections = async () => {
  await User.collection.drop();
  await Event.collection.drop();
  await Attendee.collection.drop();
  console.log('>>> Colecciones limpias');
};

const saveDocuments = async () => {
  try {
    const users = await User.insertMany(seed.users);
    // Asignar organizadores a eventos
    const eventsWithOrganizers = seed.events.map((event, index) => {
      // Alternar organizadores entre usuarios
      return { ...event, organizer: users[index % users.length]._id };
    });

    // Insertar eventos
    const savedEvents = await Event.insertMany(eventsWithOrganizers);
    console.log('>>> Documentos guardados con éxito!');

    // Crear asistentes y asignar eventos
    const attendeesData = [
      {
        name: users[0].name,
        email: users[0].email,
        events: [savedEvents[0]._id, savedEvents[1]._id],
      },
      {
        name: users[1].name,
        email: users[1].email,
        events: [savedEvents[2]._id],
      },
    ];

    const attendees = await Attendee.insertMany(attendeesData);

    console.log('>>> Asistentes asignados con éxito!');

    return { users, savedEvents, attendees };
  } catch (error) {
    console.error('Error guardando documentos:', error);
  }
};

module.exports = {
  cleanCollections,
  saveDocuments,
};
