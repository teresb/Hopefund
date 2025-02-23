// server/controllers/adminController.js

const Fundraiser = require('../models/Fundraiser');

// GET /api/admin/fundraisers
// Returns all fundraisers with status "pending"
exports.getPendingFundraisers = async (req, res) => {
  try {
    const pendingFundraisers = await Fundraiser.find({ status: 'pending' }).populate('creator', 'name email');
    res.status(200).json(pendingFundraisers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching pending fundraisers.' });
  }
};

// PUT /api/admin/fundraisers/:id/approve
// Approves a fundraiser by updating its status to "approved"
exports.approveFundraiser = async (req, res) => {
  const { id } = req.params;
  try {
    const fundraiser = await Fundraiser.findById(id);
    if (!fundraiser) {
      return res.status(404).json({ message: 'Fundraiser not found.' });
    }
    
    // Update the status to approved
    fundraiser.status = 'approved';
    await fundraiser.save();

    // Optionally, emit a Socket.io event for real-time updates
    if (req.app.get('io')) {
      req.app.get('io').emit('fundraiserApproved', fundraiser);
    }

    res.status(200).json({ message: 'Fundraiser approved successfully.', fundraiser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error approving fundraiser.' });
  }
};
