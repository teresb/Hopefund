const express = require('express');
const router = express.Router();

const {
  createFundraiser,
  getFundraisers,
  updateFundraiser,
  deleteFundraiser,
} = require('../controllers/fundraiser');

const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createFundraiser);

router.get('/', getFundraisers);

router.put('/:id', authMiddleware, updateFundraiser);

router.delete('/:id', authMiddleware, deleteFundraiser);

module.exports = router;
