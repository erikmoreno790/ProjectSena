const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Request', RequestSchema);
