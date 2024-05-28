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

  module.exports = {getAttendees, getAttendeeByid}