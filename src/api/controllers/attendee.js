
const { setError } = require('../../config/error');
const Attendee = require('../models/attendee');

const getAttendees = async (req, res, next) => {
    try {
      const attendees = await Attendee.find().populate('events');;
      return res.status(200).json(attendees);
    } catch (error) {
      return next(setError(400, 'no attendees found'));
    }
  };

  const getAttendeeByid = async (req, res, next) => {
    try {
      const { id } = req.params;
      const attendee = await Attendee.findById(id).populate('events');;
      return res.status(200).json(attendee);
    } catch (error) {
      return next(setError(400, "can't find attendee 😱"));
    }
  };

  const getAttendeesSortedByName = async (req, res, next) => {
    try {
      const attendees = await Attendee.find().sort({ name: 1 }).populate('events');
      if (!attendees || attendees.length === 0) {
        return next(setError(400, 'No attendees found'));
      }
      return res.status(200).json(attendees);
    } catch (error) {
      return next(setError(400, 'Error retrieving attendees'));
    }
  };

  module.exports = {getAttendees, getAttendeeByid, getAttendeesSortedByName}