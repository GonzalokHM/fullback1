const { getAttendees, getAttendeeByid } = require('../controllers/attendee');

const attendeesRoutes = require('express').Router();

attendeesRoutes.get('/', getAttendees);
attendeesRoutes.get('/:id', getAttendeeByid);

module.exports = attendeesRoutes;
