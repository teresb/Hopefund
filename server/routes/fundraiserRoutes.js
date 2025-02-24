const express = require('express');
const router = express.Router();

const {
  createFundraiser,
  getFundraisers,
  updateFundraiser,
  deleteFundraiser,
  getFundraiserById,
} = require('../controllers/fundraiser');

const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');


router.post('/', authMiddleware, upload.single('image'), createFundraiser);

router.get('/', getFundraisers);

router.get('/:id', getFundraiserById);

router.put('/:id', authMiddleware, updateFundraiser);

router.delete('/:id', authMiddleware, deleteFundraiser);

module.exports = router;
