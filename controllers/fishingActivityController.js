const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const FishingActivity = require("../models/fishingActivityModel");


const fishingActivityController = {

  exportExcel: async (req, res) => {
  try {
    const { month, year } = req.query;
    let filters = {};

    if (month) {
      filters.month = month;
    }
    if (year) {
      filters.year = year;
    }

    const data = await FishingActivity.getAllWithUserNamesByMonthYear(filters);

    // Convert to worksheet
    const worksheetData = data.map((activity) => ({
      Date:new Date(activity.date).toDateString(),
      'Start Time': activity.start_time,
      'End Time': activity.end_time,
      Location: activity.location,
      Method: activity.method,
      Weather: activity.weather,
      'Submitted By': activity.submitted_by
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fishing Activities');

    const filePath = path.join(__dirname, '../exports/fishing_activities.xlsx');
    XLSX.writeFile(workbook, filePath);

    res.download(filePath, 'fishing_activities.xlsx', () => {
      fs.unlinkSync(filePath); // Clean up
    });
  } catch (error) {
    console.error('Excel Export Error:', error);
    res.status(500).send('Error exporting Excel');
  }
},
exportPDF: async (req, res) => {
  try {
    const { month, year } = req.query;
    let filters = {};

    if (month) {
      filters.month = month;
    }
    if (year) {
      filters.year = year;
    }

    const data = await FishingActivity.getAllWithUserNamesByMonthYear(filters);

    const doc = new PDFDocument();
    const filePath = path.join(__dirname, '../exports/fishing_activities.pdf');
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(18).text('Fishing Activities Report', { align: 'center' });
    doc.moveDown();

    data.forEach((activity, idx) => {
      doc.fontSize(12).text(`${idx + 1}. Date: ${new Date(activity.date).toDateString()}`);
      doc.text(`   Time: ${activity.start_time} - ${activity.end_time}`);
      doc.text(`   Location: ${activity.location}`);
      doc.text(`   Method: ${activity.method}`);
      doc.text(`   Weather: ${activity.weather}`);
      doc.text(`   Submitted By: ${activity.submitted_by}`);
      doc.moveDown();
    });

    doc.end();

    stream.on('finish', () => {
      res.download(filePath, 'fishing_activities.pdf', () => {
        fs.unlinkSync(filePath); // Clean up
      });
    });
  } catch (error) {
    console.error('PDF Export Error:', error);
    res.status(500).send('Error exporting PDF');
  }
},

  // 👤 For Regular Users
  getFishingActivities: async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).send("Unauthorized");

      const filters = {
        date: req.query.date || '',
        location: req.query.location || '',
        method: req.query.method || '',
        sortBy: req.query.sortBy || 'date'
      };

      const activities = await FishingActivity.getAll(filters, userId);
      const user = req.session.user;

      res.render('fishing-activity-tracking', { activities, filters, user });
    } catch (error) {
      console.error('Error fetching fishing activities:', error);
      res.status(500).send('Server Error');
    }
  },

  // ➕ Add new activity (both admin & user)
  addFishingActivity: async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).send("Unauthorized");

      const { date, start_time, end_time, location, method, weather } = req.body;
      await FishingActivity.addActivity({
        user_id: userId,
        date,
        start_time,
        end_time,
        location,
        method,
        weather
      });

      req.flash('success', 'Fishing activity added successfully.');
      res.redirect('back');
    } catch (error) {
      console.error('Error adding fishing activity:', error);
      req.flash('error', 'Error adding fishing activity.');
      res.redirect('back');
    }
  },

  // 🧑‍💼 Admin View - Show ALL Activities with User Names
  getFishingActivitiesForAdmin: async (req, res) => {
    try {
      const filters = {
        date: req.query.date || '',
        location: req.query.location || '',
        method: req.query.method || '',
        sortBy: req.query.sortBy || 'date'
      };

      const activities = await FishingActivity.getAllWithUserNames(filters); // <-- Fixed
      const user = req.session.user;

      res.render('fishingActivity', { activities, filters, user });
    } catch (error) {
      console.error('Admin view error:', error);
      res.status(500).send('Server Error');
    }
  },
  getFishingActivityList: async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).send('Unauthorized');

      const filters = {
        date: req.query.date || '',
        location: req.query.location || '',
        method: req.query.method || '',
        sortBy: req.query.sortBy || 'date',
      };

      const activities = await FishingActivity.getAll(filters, userId);
      const user = req.session.user;

      res.render('fishing-activity-list', { activities, filters, user });
    } catch (error) {
      console.error('Error fetching fishing activities:', error);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = fishingActivityController;
