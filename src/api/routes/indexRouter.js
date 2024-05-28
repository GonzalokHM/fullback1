const { apiLimiter } = require('../../middlewares/limitRate');
const eventsRoutes = require('./event');
const attendeesRoutes = require('./attendee');
const userRoutes = require('./user');
const authRoutes = require('./auth');

const indexRouter = require('express').Router();

indexRouter.use(apiLimiter);

indexRouter.use('/attendees', attendeesRoutes);
indexRouter.use('/events', eventsRoutes);
indexRouter.use('/users', userRoutes)
indexRouter.use('/auth', authRoutes)

module.exports = indexRouter;