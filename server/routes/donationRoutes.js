const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// Get all donations
router.get('/', donationController.getAllDonations);

// Get donations by campaign
router.get('/campaign/:campaignId', donationController.getDonationsByCampaign);

// Get donations by user
router.get('/user/:userId', donationController.getDonationsByUser);

// Create a donation (anonymous if no user)
router.post('/', donationController.createDonation);

module.exports = router;
