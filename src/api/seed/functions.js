const { connectDB } = require('../../config/db');
const Event = require('../models/event');
const seed = require('./seedData');
connectDB()

const cleanCollections = async () => {
  await Event.collection.drop();
  console.log('>>> Colecciones limpias');
};

const saveDocuments = async () => {
  try {
    const events = await Event.insertMany(seed.events);
    console.log('>>> eventos insertados con éxito!');
      

    console.log('>>> Documentos guardados con éxito!');
    return { events };

  } catch (error) {
    console.error('Error guardando documentos:', error);
  }
};

module.exports = {
  cleanCollections,
  saveDocuments,
};
