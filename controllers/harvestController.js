const Harvest = require("../models/harvestModel");
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

exports.exportToExcel = async (req, res) => {
    try {
        const { month, year } = req.query;
        const harvests = await Harvest.getFilteredHarvests(month, year);

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Harvest Report");

        sheet.columns = [
            { header: "User", key: "user_id" },
            { header: "Fish Type", key: "fish_type" },
            { header: "Quantity", key: "weight" },
            { header: "Unit", key: "unit" },
            { header: "Ownership", key: "ownership" },
            { header: "Source of Fry", key: "source_of_fry" },
            { header: "Market Destination", key: "market_destination" },
            { header: "Remarks", key: "remarks" },
            { header: "Date Harvested", key: "date_harvested" },
        ];

        harvests.forEach(h => {
sheet.addRow({
    user_name: h.user_name,
    fish_type: h.fish_type,
    weight: h.weight,
    unit: h.unit,
    ownership: h.ownership,
    source_of_fry: h.source_of_fry,
    market_destination: h.market_destination,
    remarks: h.remarks,
    date_harvested: new Date(h.date_harvested).toLocaleDateString()
});
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="harvest_report.xlsx"');
        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error("Export Excel error:", err);
        res.status(500).send("Failed to export Excel.");
    }
};

exports.exportToPDF = async (req, res) => {
    try {
        const { month, year } = req.query;
        const harvests = await Harvest.getFilteredHarvests(month, year);

        const doc = new PDFDocument({ margin: 30, size: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="harvest_report.pdf"');
        doc.pipe(res);

        doc.fontSize(16).text("Harvest & Production Report", { align: "center" });
        doc.moveDown();

        harvests.forEach(h => {
          doc.fontSize(11).text(`User: ${h.user_name}`);
            doc.text(`Fish Type: ${h.fish_type}`);
            doc.text(`Quantity: ${h.weight} ${h.unit}`);
            doc.text(`Ownership: ${h.ownership}`);
            doc.text(`Source of Fry: ${h.source_of_fry}`);
            doc.text(`Market Destination: ${h.market_destination}`);
            doc.text(`Remarks: ${h.remarks}`);
            doc.text(`Date Harvested: ${new Date(h.date_harvested).toLocaleDateString()}`);
            doc.moveDown();
        });

        doc.end();
    } catch (err) {
        console.error("Export PDF error:", err);
        res.status(500).send("Failed to export PDF.");
    }
};
exports.addHarvest = async (req, res) => {
    try {
        const { fishType, weight, unit, ownership, sourceOfFry, marketDestination, remarks, dateHarvested } = req.body;
        const userId = req.session.userId;
        await Harvest.addHarvest(userId, fishType, weight, unit, ownership, sourceOfFry, marketDestination, remarks, dateHarvested);
        res.redirect("/harvest/user-view");
    } catch (error) {
        console.error("Error adding harvest:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.viewAllHarvests = async (req, res) => {
    try {
        const { month, year } = req.query;
        const harvests = await Harvest.getFilteredHarvests(month, year);
        res.render("admin-harvest", { harvests, filters: req.query });
    } catch (error) {
        console.error("Error fetching harvests:", error);
        res.status(500).send("Internal Server Error");
    }
};


exports.viewUserHarvests = async (req, res) => {
    try {
        const userId = req.session.userId;
        const harvests = await Harvest.getHarvestByUser(userId);
        res.render("user-harvest", { harvests });
    } catch (error) {
        console.error("Error fetching user harvests:", error);
        res.status(500).send("Internal Server Error");
    }
};