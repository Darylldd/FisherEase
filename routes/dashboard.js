const express = require('express');
const router = express.Router();
const DashboardController = require("../controllers/dashboardController");


router.get('/user', DashboardController.getUserDashboard);
// Middleware to check authentication and roles
const checkAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login'); // Redirect to login if not logged in
  }
  next();
};

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.session.role !== role) {
      return res.status(403).send('Access Denied');
    }
    next();
  }; 
};

// Admin Dashboard (Only accessible to admins)
router.get('/admin', checkAuth, checkRole('admin'), (req, res) => {
  res.render('dashboard-admin', { title: 'Admin Dashboard', user: req.session.user });
});

// User Dashboard (Only accessible to users)
router.get('/user', checkAuth, checkRole('user'), (req, res) => {
  res.render('dashboard-user', { title: 'User Dashboard', user: req.session.user });
});




// Route to render the admin dashboard
router.get("/admin", DashboardController.renderAdminDashboard);

// Route to fetch analytics data (for charts)
router.get("/analytics", DashboardController.getAnalyticsData);

module.exports = router;
