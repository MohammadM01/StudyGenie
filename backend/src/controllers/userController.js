const User = require('../models/User');

  const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  };

  const updateProfile = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
      res.json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  };

  const getStats = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json({ success: true, data: user.stats });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  };

  module.exports = { getProfile, updateProfile, getStats };