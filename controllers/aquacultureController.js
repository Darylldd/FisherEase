const aquacultureModel = require('../models/aquacultureModel');

exports.registerAquaculture = async (req, res) => {
  const { facility_name, location, species, capacity, owner, contact_info, pond_size } = req.body;
  try {
    const userId = req.session.userId;
    const userRole = req.session.role;
    if (!userId || !userRole || userRole !== "admin") {
      console.log("Access denied: Invalid session or non-admin role");
      return res.redirect("/auth/login");
    }

    await aquacultureModel.registerAquaculture({ facility_name, location, species, capacity, owner, contact_info, pond_size });
    res.redirect('/aquaculture/list');
  } catch (err) {
    console.error("Error registering aquaculture facility:", err);
    res.status(500).send('Error registering aquaculture facility');
  }
};

exports.getAllFacilities = async (req, res) => {
  try {
    console.log("Session:", req.session); // Debug session
    const userId = req.session.userId;
    const userRole = req.session.role;
    if (!userId || !userRole || userRole !== "admin") {
      console.log("Access denied: Invalid session or non-admin role");
      return res.redirect("/auth/login");
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 10;
    const { facilities, total } = await aquacultureModel.getAllFacilities(page, limit);
    console.log("Facilities fetched:", facilities.length, "Total:", total); // Debug facilities

    const totalPages = Math.ceil(total / limit);

    res.render('aquaculture-table', { 
      title: 'Aquaculture Facilities',
      facilities,
      user: req.session.user || { name: "Guest" },
      currentPage: page,
      totalPages
    });
  } catch (err) {
    console.error("Error retrieving facilities:", err);
    res.status(500).send('Error retrieving facilities');
  }
};

exports.aquacultureForm = async (req, res) => {
  try {
    const userId = req.session.userId;
    const userRole = req.session.role;
    if (!userId || !userRole || userRole !== "admin") {
      console.log("Access denied: Invalid session or non-admin role");
      return res.redirect("/auth/login");
    }

    res.render('register-aquaculture', { 
      title: 'Aquaculture Facility Registration',
      user: req.session.user || { name: "Guest" }
    });
  } catch (err) {
    console.error("Error rendering aquaculture form:", err);
    res.status(500).send('Error rendering form');
  }
};

exports.editFacilityForm = async (req, res) => {
  try {
    const userId = req.session.userId;
    const userRole = req.session.role;
    if (!userId || !userRole || userRole !== "admin") {
      console.log("Access denied: Invalid session or non-admin role");
      return res.redirect("/auth/login");
    }

    const facility = await aquacultureModel.getFacilityById(req.params.id);
    if (!facility) {
      return res.status(404).send('Facility not found');
    }
    res.render('aquaculture-edit', { 
      title: 'Edit Aquaculture Facility',
      facility,
      user: req.session.user || { name: "Guest" }
    });
  } catch (err) {
    console.error("Error retrieving facility:", err);
    res.status(500).send('Error retrieving facility');
  }
};

exports.updateFacility = async (req, res) => {
  const { facility_name, location, species, capacity, owner, contact_info, pond_size } = req.body;
  try {
    const userId = req.session.userId;
    const userRole = req.session.role;
    if (!userId || !userRole || userRole !== "admin") {
      console.log("Access denied: Invalid session or non-admin role");
      return res.redirect("/auth/login");
    }

    await aquacultureModel.updateFacility(req.params.id, { facility_name, location, species, capacity, owner, contact_info, pond_size });
    res.redirect('/aquaculture/list');
  } catch (err) {
    console.error("Error updating facility:", err);
    res.status(500).send('Error updating facility');
  }
};

exports.deleteFacility = async (req, res) => {
  try {
    const userId = req.session.userId;
    const userRole = req.session.role;
    if (!userId || !userRole || userRole !== "admin") {
      console.log("Access denied: Invalid session or non-admin role");
      return res.redirect("/auth/login");
    }

    await aquacultureModel.deleteFacility(req.params.id);
    res.status(200).send('Facility deleted');
  } catch (err) {
    console.error("Error deleting facility:", err);
    res.status(500).send('Error deleting facility');
  }
};

module.exports = exports;