const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const FishingVesselModel = require('../models/fishingVesselModel');

async function showRegistrationForm(req, res) {
  const fisherfolkList = await FishingVesselModel.getFisherfolkList();
  res.render('fishingVesselForm', { user: req.user || { name: 'Admin' }, fisherfolkList });
}

async function submitRegistration(req, res) {
  try {
    req.body.submitted_by = req.user?.name || 'Admin'; // fallback
    await FishingVesselModel.createRegistration(req.body);
    res.redirect('/fishing-vessel-registrations');
  } catch (err) {
    console.error('Form submission error:', err);
    res.status(500).send('Error submitting form.');
  }
}

async function listRegistrations(req, res) {
  try {
    const registrations = await FishingVesselModel.getAllRegistrations(req.query);
    res.render('fishingVesselList', {
      registrations,
      user: req.user || { name: 'Admin' },
      filters: req.query // ← pass filters (month/year)
    });
  } catch (err) {
    console.error('Error loading registration list:', err);
    res.status(500).send('Error loading list.');
  }
}


async function exportExcel(req, res) {
  const { month, year } = req.query;
  const registrations = await FishingVesselModel.getAllRegistrationsByDate(month, year);

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Fishing Vessels');

  sheet.columns = [
    { header: 'Vessel Name', key: 'fishing_vessel_name' },
    { header: 'Vessel Type', key: 'vessel_type' },
    { header: 'Owner', key: 'fisherfolk_name' },
    { header: 'Homeport', key: 'homeport' },
    { header: 'Year Built', key: 'year_built' },
    { header: 'Builder', key: 'boat_builder_name' },
    { header: 'Submitted', key: 'created_at' },
  ];

  registrations.forEach(r => {
    sheet.addRow({
      ...r,
      created_at: new Date(r.created_at).toLocaleDateString()
    });
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=vessel_registrations.xlsx');

  await workbook.xlsx.write(res);
  res.end();
}

async function exportPDF(req, res) {
  const { month, year } = req.query;
  const registrations = await FishingVesselModel.getAllRegistrationsByDate(month, year);

  const doc = new PDFDocument();
  const filename = 'vessel_registrations.pdf';

  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  doc.fontSize(18).text('Fishing Vessel Registrations', { align: 'center' });
  doc.moveDown();

  registrations.forEach(r => {
    doc.fontSize(12).text(`Vessel Name: ${r.fishing_vessel_name || '-'}`);
    doc.text(`Type: ${r.vessel_type || '-'}`);
    doc.text(`Owner: ${r.fisherfolk_name || '-'}`);
    doc.text(`Homeport: ${r.homeport || '-'}`);
    doc.text(`Year Built: ${r.year_built || '-'}`);
    doc.text(`Builder: ${r.boat_builder_name || '-'}`);
    doc.text(`Submitted: ${new Date(r.created_at).toLocaleDateString()}`);
    doc.moveDown();
  });

  doc.end();
}

module.exports = {
 showRegistrationForm,
  submitRegistration,
  listRegistrations,
  exportExcel,
  exportPDF
};
