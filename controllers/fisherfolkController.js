const Fisherfolk = require('../models/fisherfolkModel');

exports.registerFisherfolk = async (req, res) => {
    try {
        const { first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number } = req.body;
        
        await Fisherfolk.create({ first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number });

        res.redirect('/register/fisherfolk'); // Redirect on success
    } catch (error) {
        console.error("Error registering fisherfolk:", error);
        res.status(500).send('Error registering fisherfolk');
    }
};
