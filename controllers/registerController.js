// controllers/registerController.js

exports.fisherfolkForm = (req, res) => {
    res.render('register-fisherfolk', { title: 'Fisherfolk Registration' });
  };
  
  exports.aquacultureForm = (req, res) => {
    res.render('register-aquaculture', { title: 'Aquaculture Facility Registration' });
  };
  
// controllers/registerController.js
exports.showFisherfolkRegistration = (req, res) => {
    if (req.session.user) {
      // Ensure the user object is available and pass it to the view
      res.render('register-fisherfolk', { title: 'Fisherfolk Registration', user: req.session.user });
    } else {
      res.redirect('/auth/login'); // Redirect to login if no user is in session
    }
  };
  