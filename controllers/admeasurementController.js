const AdmeasurementModel = require('../models/Admeasurement');
const FishingVesselModel = require('../models/fishingVesselModel');
const Fisherfolk = require('../models/fisherfolkModel');
const MayorModel = require('../models/mayorModel');

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// ===== Cloudinary config =====
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ===== Cloudinary storage for mayor signature =====
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'mayor_signatures',
    allowed_formats: ['png', 'jpg', 'jpeg', 'webp'],
    public_id: (req, file) => 'mayor_' + Date.now()
  }
});

const upload = multer({ storage });

async function showAdmeasurementForm(req, res) {
  try {
    const fisherfolk = await Fisherfolk.getAll();
    const vessels = await FishingVesselModel.getAll();
    const mayor = await MayorModel.getCurrent();
    const user = req.session?.user || req.user || { name: 'Admin' };
    res.render("admeasurementForm", { fisherfolk, vessels, user, mayor });
  } catch (error) {
    console.error("Error loading form:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function submitAdmeasurementForm(req, res) {
  try {
    const data = { ...req.body };

    // If signature uploaded → save Cloudinary URL
    if (req.file && req.file.path) {
      data.mayor_signature = req.file.path;  // Cloudinary hosted link
    } else {
      // Keep existing signature
      data.mayor_signature = req.body.existing_mayor_signature || null;
    }

    await AdmeasurementModel.create(data);
    res.redirect('/admeasurement-forms');
  } catch (error) {
    console.error('Submit Error:', error);
    res.status(500).send('Error submitting form.');
  }
}

async function listAdmeasurements(req, res) {
  const forms = await AdmeasurementModel.getAll();
  const user = req.session.user || req.user || { name: 'Admin' };
  res.render('admeasurementList', { forms, user });
}


module.exports = {
  showAdmeasurementForm,
  submitAdmeasurementForm,
  listAdmeasurements,
  upload
};
