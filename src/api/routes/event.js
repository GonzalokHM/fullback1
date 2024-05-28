const { getEvents, getEventByid } = require('../controllers/event')

const eventsRoutes = require('express').Router()

eventsRoutes.get('/', getEvents)
eventsRoutes.get('/:id', getEventByid)

module.exports = eventsRoutes;