// server/routes/adminRoutes.js

const express = require('express');
const router = express.Router();

// Import controller functions
const { getPendingFundraisers, approveFundraiser } = require('../controllers/admin');

// Import middleware
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// GET /api/admin/fundraisers - List all pending fundraisers (admin only)
router.get('/fundraisers', authMiddleware, adminMiddleware, getPendingFundraisers);

// PUT /api/admin/fundraisers/:id/approve - Approve a fundraiser (admin only)
router.put('/fundraisers/:id/approve', authMiddleware, adminMiddleware, approveFundraiser);

module.exports = router;
