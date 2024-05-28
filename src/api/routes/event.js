const { isAuth, isAdmin } = require('../../middlewares/auth');
const { getEvents, getEventByid, getEventsSortedByDate, getEventsByOrganizer, assignOrganizer } = require('../controllers/event')

const eventsRoutes = require('express').Router()

eventsRoutes.get('/findOrganizerByid/:organizerId', getEventsByOrganizer)
eventsRoutes.get('/order/sortedDate', getEventsSortedByDate)
eventsRoutes.get('/', getEvents)
eventsRoutes.get('/:id', getEventByid)
eventsRoutes.post('/assignOrganizer', [isAuth , isAdmin], assignOrganizer);

module.exports = eventsRoutes;