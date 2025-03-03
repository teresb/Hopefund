const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema);