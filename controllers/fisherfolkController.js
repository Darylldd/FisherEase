const Fisherfolk = require('../models/fisherfolkModel');

exports.registerFisherfolk = async (req, res) => {
    try {
        const { license_number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, civil_status } = req.body;
        
        await Fisherfolk.create({ license_number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, civil_status});

        res.redirect('/fisherfolk/table');
    } catch (error) {
        console.error("Error registering fisherfolk:", error);
        res.status(500).send('Error registering fisherfolk');
    }
};

exports.getFisherfolkTable = async (req, res) => {
    try {
        const fisherfolk = await Fisherfolk.getAll();
        const user = req.session.user || req.user || { name: 'Admin' }; // ✅
        res.render('fisherfolk-table', { fisherfolk, user });
    } catch (error) {
        console.error("Error fetching fisherfolk table:", error);
        res.status(500).send('Error fetching fisherfolk table');
    }
};

exports.editFisherfolkForm = async (req, res) => {
    try {
        const fisher = await Fisherfolk.getById(req.params.id);
        if (!fisher) {
            return res.status(404).send('Fisherfolk not found');
        }
        const user = req.session.user || req.user || { name: 'Admin' }; // ✅
        res.render('fisherfolk-edit', { fisher, user });
    } catch (error) {
        console.error("Error fetching fisherfolk for edit:", error);
        res.status(500).send('Error fetching fisherfolk');
    }
};


exports.updateFisherfolk = async (req, res) => {
    try {
        const { license_number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, civil_status } = req.body;
        await Fisherfolk.update(req.params.id, { license_number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone,  civil_status});
        res.redirect('/fisherfolk/table');
    } catch (error) {
        console.error("Error updating fisherfolk:", error);
        res.status(500).send('Error updating fisherfolk');
    }
};

exports.deleteFisherfolk = async (req, res) => {
    try {
        await Fisherfolk.delete(req.params.id);
        res.redirect('/fisherfolk/table');
    } catch (error) {
        console.error("Error deleting fisherfolk:", error);
        res.status(500).send('Error deleting fisherfolk');
    }
};