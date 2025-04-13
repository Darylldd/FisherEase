const FishingActivity = require('../models/fishingActivityModel');

const fishingActivityController = {
  getFishingActivities: async (req, res) => {
    try {
      const filters = {
        date: req.query.date || '',
        location: req.query.location || '',
        method: req.query.method || '',
        sortBy: req.query.sortBy || 'date'
      };

      const activities = await FishingActivity.getAll(filters);
      const user = req.session.user || { name: 'Guest' };

      res.render('fishing-activity-tracking', { activities, filters, user });
    } catch (error) {
      console.error('Error fetching fishing activities:', error);
      res.status(500).send('Server Error');
    }
  },
  showFishingActivityForm: (req, res) => {
    const user = req.session.user || { name: 'Guest' };
    res.render('fishingActivity', { user });
  },

  getFishingActivitiesForUser: async (req, res) => {
    try {
      const activities = await FishingActivity.getAll();
      const user = req.session.user || { name: 'Guest' };

      // Fix: Ensure filters is always defined
      const filters = {
        date: '',
        location: '',
        method: '',
        sortBy: 'date'
      };

      res.render('fishingActivity', { activities, filters, user });
    } catch (error) {
      console.error('Error fetching fishing activities:', error);
      res.status(500).send('Server Error');
    }
  },

  addFishingActivity: async (req, res) => {
    try {
      const { date, start_time, end_time, location, method, weather } = req.body;
      await FishingActivity.addActivity({ date, start_time, end_time, location, method, weather });

      req.flash('success', 'Fishing activity added successfully.');
      res.redirect('/fishing-activity-tracking');
    } catch (error) {
      console.error('Error adding fishing activity:', error);
      req.flash('error', 'Error adding fishing activity.');
      res.redirect('/fishing-activity-tracking');
    }
  }
};

module.exports = fishingActivityController;
