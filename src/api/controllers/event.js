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

  const getEventsSortedByDate = async (req, res, next) => {
    try {
      const events = await Event.find().sort({ date: 1 }).populate('organizer');
      return res.status(200).json(events);
    } catch (error) {
      return next(setError(400, 'No events found'));
    }
  };
  const getEventsByOrganizer = async (req, res, next) => {
    const { organizerId } = req.params;
    try {
      const events = await Event.find({ organizer: organizerId }).populate('organizer');
      if (!events) {
        return next(setError(404, 'No events found for this organizer'));
      }
      res.status(200).json(events);
    } catch (error) {
      return next(setError(500, 'Error retrieving events'));
    }
  };

  const assignOrganizer = async (req, res, next) => {
    const { eventId, organizerId } = req.body;
  
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return next(setError(404, 'Event not found'));
      }
  
      const organizer = await User.findById(organizerId);
      if (!organizer) {
        return next(setError(404, 'Organizer not found'));
      }
  
      event.organizer = organizerId;
      await event.save();
  
      return res.status(200).json(event);
    } catch (error) {
      return next(setError(500, 'Error assigning organizer to event'));
    }
  };

  module.exports = {getEvents, getEventByid, getEventsSortedByDate, getEventsByOrganizer, assignOrganizer}