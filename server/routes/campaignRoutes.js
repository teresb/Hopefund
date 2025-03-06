const express = require('express');
const router = express.Router();

const {
  createCampaign,
  getCampaigns,
  updateCampaign,
  deleteCampaign,
  getCampaignById,
  getPendingCampaigns,
  approveCampaign,
  getCampaignsByCreator,
  getPendingCampaignsByCreator, // Add this line
} = require('../controllers/CampaignController');

const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', authMiddleware, upload.single('image'), createCampaign);

router.get('/', getCampaigns);

router.get('/pending', getPendingCampaigns);

router.get('/:id', getCampaignById);

router.get('/creator/:creatorId', getCampaignsByCreator);

router.get('/creator/:creatorId/pending', getPendingCampaignsByCreator); // Add this line

router.put('/:id', authMiddleware, updateCampaign);

router.put('/:id/approve', approveCampaign);

router.delete('/:id', authMiddleware, deleteCampaign);

module.exports = router;
