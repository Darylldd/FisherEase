const climateModel = require('../models/climateModel');

exports.getClimateAnalysis = async (req, res) => {
    try {
        let climateData = await climateModel.fetchClimateEvents();

        console.log("Fetched Climate Data:", climateData); // Debugging

        if (!Array.isArray(climateData)) {
            console.error("Error: climateData is not an array", climateData);
            climateData = []; // Fallback to empty array
        }

        res.render('climateAnalysis', { climateData });
    } catch (error) {
        console.error("Error fetching climate analysis:", error);
        res.status(500).send("Error loading climate analysis");
    }
};
