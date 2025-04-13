// controllers/aquacultureController.js
const aquacultureModel = require('../models/aquacultureModel');

exports.registerAquaculture = async (req, res) => {
    console.log(req.body);  // Log the data to verify that it's being received correctly
    const { facility_name, location, species, capacity, owner, contact_info } = req.body;
    try {
        await aquacultureModel.registerAquaculture({ facility_name, location, species, capacity, owner, contact_info });
        res.redirect('/register/aquaculture');  // Redirect to the registration page after successful registration
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering aquaculture facility');
    }
};

exports.aquacultureForm = (req, res) => {
    res.render('register-aquaculture', { title: 'Aquaculture Facility Registration' });
  };
  