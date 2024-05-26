const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
},
{ timestamps: true, collection: 'attendee' }
);

const Attendee = mongoose.model('attendee', attendeeSchema);

module.exports = Attendee;