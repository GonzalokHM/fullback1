const Event = require('../models/event');
const { setError } = require('../../config/error');


const getEvents = async (req, res, next) => {
    try {
      const events = await Event.find();
      return res.status(200).json(events);
    } catch (error) {
      return next(setError(400, 'no events found'));
    }
  };

  const getEventByid = async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await Event.findById(id);
      return res.status(200).json(event);
    } catch (error) {
      return next(setError(400, "can't find event 😱"));
    }
  };

  module.exports = {getEvents, getEventByid}