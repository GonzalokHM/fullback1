const { getAttendees, getAttendeeByid , getAttendeesSortedByName} = require('../controllers/attendee');

const attendeesRoutes = require('express').Router();

attendeesRoutes.get('/order/sortedName', getAttendeesSortedByName);
attendeesRoutes.get('/', getAttendees);
attendeesRoutes.get('/:id', getAttendeeByid);

module.exports = attendeesRoutes;
