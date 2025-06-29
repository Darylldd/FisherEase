const express = require("express");
const router = express.Router();
const HarvestController = require("../controllers/harvestController");

router.post("/add", HarvestController.addHarvest);
router.get("/add", (req, res) => {
    res.render("harvest-form");
});
router.get("/view", HarvestController.viewAllHarvests);
router.get("/my-harvests", HarvestController.viewUserHarvests);
router.get("/user-view", HarvestController.viewUserHarvests);
router.get("/admin-view", HarvestController.viewAllHarvests);

module.exports = router;