const Campaign = require('../models/Campaign');

// Create a campaign
exports.createCampaign = async (req, res) => {
  const { title, description, goal, deadline, media } = req.body;
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    // Build the image URL if a file was uploaded
    let imageUrl = '';
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    
    const campaign = new Campaign({
      title,
      description,
      goal,
      deadline,
      image: imageUrl,
      creator: req.user.userId,
    });
    await campaign.save();

    if (req.app.get('io')) {
      req.app.get('io').emit('campaignCreated', campaign);
    }

    res.status(201).json({
      message: 'Campaign created successfully',
      campaign,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getPendingCampaigns = async (req, res) => {
  try {
    const pendingCampaigns = await Campaign.find({ status: 'pending' }).populate('creator', 'name email');
    res.status(200).json(pendingCampaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching pending campaigns.' });
  }
};

// Get pending campaigns by creator
exports.getPendingCampaignsByCreator = async (req, res) => {
  const { creatorId } = req.params;
  try {
    const campaigns = await Campaign.find({ creator: creatorId, status: 'pending' }).populate('creator', 'name email');
    if (!campaigns.length) {
      return res.status(404).json({ message: 'No pending campaigns found for this creator.' });
    }
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching pending campaigns by creator:', error);
    res.status(500).json({ message: 'Server error fetching pending campaigns by creator.' });
  }
};

// Get campaigns with optional search/filter parameters
exports.getCampaigns = async (req, res) => {
  const { search } = req.query;
  try {
    const baseQuery = { status: 'approved' };

    const query = search
      ? {
          ...baseQuery,
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        }
      : baseQuery;

    const campaigns = await Campaign.find(query).populate('creator', 'name');
    res.status(200).json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching campaigns' });
  }
};

exports.getCampaignById = async (req, res) => {
  const { id } = req.params;
  try {
    const campaign = await Campaign.findById(id).populate('creator', 'name email');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ message: 'Server error fetching campaign.' });
  }
};

exports.approveCampaign = async (req, res) => {
  const { id } = req.params;
  try {
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    
    // Update the status to approved
    campaign.status = 'approved';
    await campaign.save();

    // Optionally, emit a Socket.io event for real-time updates
    if (req.app.get('io')) {
      req.app.get('io').emit('campaignApproved', campaign);
    }

    res.status(200).json({ message: 'Campaign approved successfully.', campaign });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error approving campaign.' });
  }
};

// Get campaigns by creator
exports.getCampaignsByCreator = async (req, res) => {
  const { creatorId } = req.params;
  try {
    const campaigns = await Campaign.find({ creator: creatorId, status: 'approved' }).populate('creator', 'name email');
    if (!campaigns.length) {
      return res.status(404).json({ message: 'No campaigns found for this creator.' });
    }
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns by creator:', error);
    res.status(500).json({ message: 'Server error fetching campaigns by creator.' });
  }
};

// Update a campaign
exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const { title, description, goal, deadline, media } = req.body;
    
  try {
      let campaign = await Campaign.findById(id);
      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found or unauthorized' });
      }
      

      res.status(200).json({message: 'Campaign updated successfully',campaign});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Delete a campaign
exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findById(id); // Correct this line
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    if (campaign.creator.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'User not authorized to delete this campaign' });
    }

    await campaign.deleteOne();

    if (req.app.get('io')) {
      req.app.get('io').emit('campaignDeleted', { id });
    }

    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };