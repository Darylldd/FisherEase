const Harvest = require("../models/harvestModel");

exports.addHarvest = async (req, res) => {
    try {
        const { fishType, weight, location, dateHarvested } = req.body;
        const userId = req.session.userId; // Assuming user session exists
        await Harvest.addHarvest(userId, fishType, weight, location, dateHarvested);
        res.redirect("/harvest/user-view"); // Redirect user to their harvests
    } catch (error) {
        console.error("Error adding harvest:", error);
        res.status(500).send("Internal Server Error");
    }
};

// ✅ Fix: Render `admin-harvest.ejs` for Admin View
exports.viewAllHarvests = async (req, res) => {
    try {
        const harvests = await Harvest.getAllHarvests();
        res.render("admin-harvest", { harvests }); // ✅ Render admin-specific view
    } catch (error) {
        console.error("Error fetching harvests:", error);
        res.status(500).send("Internal Server Error");
    }
};

// ✅ Fix: Render `user-harvest.ejs` for User View
exports.viewUserHarvests = async (req, res) => {
    try {
        const userId = req.session.userId;
        const harvests = await Harvest.getHarvestByUser(userId);
        res.render("user-harvest", { harvests }); // ✅ Render user-specific view
    } catch (error) {
        console.error("Error fetching user harvests:", error);
        res.status(500).send("Internal Server Error");
    }
};
