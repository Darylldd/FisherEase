const Harvest = require("../models/harvestModel");

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
        const harvests = await Harvest.getAllHarvests();
        res.render("admin-harvest", { harvests });
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