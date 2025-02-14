const Fundraiser = require('../models/Fundraiser');

// Create a fundraiser
exports.createFundraiser = async (req, res) => {
  const { title, description, goal, deadline, media } = req.body;
  try {
    const fundraiser = new Fundraiser({
      title,
      description,
      goal,
      deadline,
      media,
      creator: req.user.userId,
    });
    await fundraiser.save();

    if (req.app.get('io')) {
      req.app.get('io').emit('fundraiserCreated', fundraiser);
    }

    res.status(201).json({
      message: 'Fundraiser created successfully',
      fundraiser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// Get fundraisers with optional search/filter parameters
exports.getFundraisers = async (req, res) => {
  const { search } = req.query;
  try {
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const fundraisers = await Fundraiser.find(query).populate('creator', 'name');
    res.status(200).json(fundraisers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching fundraisers' });
  }
};

// Update a fundraiser
exports.updateFundraiser = async (req, res) => {
  const { id } = req.params;
  const { title, description, goal, deadline, media } = req.body;
    
  try {
      let fundraiser = await Fundraiser.findById(id);
      if (!fundraiser) {
        return res.status(404).json({ message: 'Fundraiser not found or unauthorized' });
      }
      
      if (fundraiser.creator.toString() !== req.user.userId) {
        return res.status(401).json({ message: 'User not authorized to update this fundraiser' });
      }
  
      fundraiser.title = title || fundraiser.title;
      fundraiser.description = description || fundraiser.description;
      fundraiser.goal = goal || fundraiser.goal;
      fundraiser.deadline = deadline || fundraiser.deadline;
      fundraiser.media = media || fundraiser.media;
  
      await fundraiser.save();
      
      if (req.app.get('io')) {
          req.app.get('io').emit('fundraiserUpdated', fundraiser);
        }

      res.status(200).json({message: 'Fundraiser updated successfully',fundraiser});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Delete a fundraiser
exports.deleteFundraiser = async (req, res) => {
  const { id } = req.params;

  try {
    const fundraiser = await Fundraiser.findById(id);
    if (!fundraiser) {
      return res.status(404).json({ message: 'Fundraiser not found' });
    }

    if (fundraiser.creator.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'User not authorized to delete this fundraiser' });
    }

    await fundraiser.deleteOne();

    if (req.app.get('io')) {
      req.app.get('io').emit('fundraiserDeleted', { id });
    }

    res.status(200).json({ message: 'Fundraiser deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };