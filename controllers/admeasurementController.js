const AdmeasurementModel = require('../models/Admeasurement');
const FishingVesselModel = require('../models/fishingVesselModel');
const Fisherfolk = require('../models/fisherfolkModel');

async function showAdmeasurementForm(req, res) {
 try {
    const fisherfolk = await Fisherfolk.getAll();
    const vessels = await FishingVesselModel.getAll();
    res.render("admeasurementForm", { fisherfolk, vessels });
  } catch (error) {
    console.error("Error loading form:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function submitAdmeasurementForm(req, res) {
  try {
    await AdmeasurementModel.create(req.body);
    res.redirect('/admeasurement-forms');
  } catch (error) {
    console.error('Submit Error:', error);
    res.status(500).send('Error submitting form.');
  }
}

async function listAdmeasurements(req, res) {
  const forms = await AdmeasurementModel.getAll();
  res.render('admeasurementList', { forms, user: req.user || { name: 'Admin' } });
}

module.exports = {
  showAdmeasurementForm,
  submitAdmeasurementForm,
  listAdmeasurements
};
