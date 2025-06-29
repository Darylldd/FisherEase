const aquacultureModel = require('../models/aquacultureModel');

exports.registerAquaculture = async (req, res) => {
    console.log(req.body);  // Log the received form data

    const { facility_name, location, species, capacity, owner, contact_info } = req.body;

    try {
        const newFacility = await aquacultureModel.registerAquaculture({
            facility_name,
            location,
            species,
            capacity,
            owner,
            contact_info
        });

        // You can log or flash this if you want:
        console.log('✅ Registered Facility:', newFacility);

        // Redirect back to form (you can also pass success messages here if needed)
        res.redirect('/register/aquaculture');
    } catch (err) {
        console.error('❌ Registration error:', err.message);
        res.status(500).send('Error registering aquaculture facility');
    }
};

exports.aquacultureForm = (req, res) => {
    res.render('register-aquaculture', { title: 'Aquaculture Facility Registration' });
};
