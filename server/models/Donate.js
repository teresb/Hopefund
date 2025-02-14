const donateSchema = new mongoose.Schema({
    fundraiser: { type: mongoose.Schema.Types.ObjectId, ref: 'Fundraiser', required: true },
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Donate', donateSchema);