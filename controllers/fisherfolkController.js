const Fisherfolk = require('../models/fisherfolkModel');

exports.registerFisherfolk = async (req, res) => {
    try {
        const { number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay } = req.body;
        
        await Fisherfolk.create({ number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay });

        res.redirect('/register/fisherfolk'); // Redirect on success
    } catch (error) {
        console.error("Error registering fisherfolk:", error);
        res.status(500).send('Error registering fisherfolk');
    }
};

exports.getFisherfolkTable = async (req, res) => {
    try {
        const fisherfolk = await Fisherfolk.getAll();
        res.render('fisherfolk-table', { fisherfolk, user: req.user || { name: 'Admin' } }); // Pass user data if available
    } catch (error) {
        console.error("Error fetching fisherfolk table:", error);
        res.status(500).send('Error fetching fisherfolk table');
    }
};