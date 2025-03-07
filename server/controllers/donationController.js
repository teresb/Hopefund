const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');

const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('campaign').populate('donor');
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDonationsByCampaign = async (req, res) => {
  try {
    const donations = await Donation.find({ campaign: req.params.campaignId }).populate('campaign').populate('donor');
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDonationsByUser = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.params.userId }).populate('campaign').populate('donor');
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createDonation = async (req, res) => {
  const { campaign, donor, amount } = req.body;

  console.log('Received donation data:', req.body);

  if (!campaign || !amount) {
    return res.status(400).json({ message: 'Campaign and amount are required' });
  }

  const donation = new Donation({
    campaign: req.body.campaign,
    donor: req.body.donor || null, // null for anonymous
    amount: req.body.amount,
  });

  try {
    const newDonation = await donation.save();

    // Update the campaign's raised amount
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaign,
      { $inc: { raised: amount } },
      { new: true }
    );

    res.status(201).json({ donation: newDonation, campaign: updatedCampaign });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllDonations,
  getDonationsByCampaign,
  getDonationsByUser,
  createDonation,
};
