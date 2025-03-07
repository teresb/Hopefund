const mongoose = require('mongoose');
const User = require('./User');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true },
  raised: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'completed'], default: 'pending' },
  image: { type: String },
}, 
{ timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);