const CatchReport = require("../models/catchReportModel");
const Violation = require("../models/violationModel");
const Harvest = require("../models/harvestModel");
const Aquaculture = require("../models/aquacultureModel");
const Fisherfolk = require("../models/fisherfolkModel");
const PostHarvest = require("../models/postHarvest"); // Add this import

const DashboardController = {
    async getAnalyticsData(req, res) {
        try {
            const totalReports = await CatchReport.getTotalReports();
            const approvedReports = await CatchReport.getApprovedReports();
            const flaggedReports = await CatchReport.getFlaggedReports();
            const speciesData = await CatchReport.getSpeciesData();
            const statusData = await CatchReport.getStatusData();
            const dailyReports = await CatchReport.getDailyReports();
            const violationData = await Violation.getViolationAnalytics();
            const totalViolations = await Violation.getTotalViolations();
            const harvestData = await Harvest.getHarvestAnalytics();
            const totalHarvests = await Harvest.getTotalHarvests();
            const aquacultureOwnerSpeciesData = await Aquaculture.getAquacultureOwnerSpeciesAnalytics();
            const totalFacilities = await Aquaculture.getTotalFacilities();
            const fisherfolkAnalytics = await Fisherfolk.getFisherfolkAnalytics();
            const totalFisherfolk = await Fisherfolk.getTotalFisherfolk();
            const postHarvestAnalytics = await PostHarvest.getPostHarvestAnalytics(); // Add this
            const totalPostHarvest = await PostHarvest.getTotalPostHarvest(); // Add this

            res.json({
                success: true,
                data: {
                    totalReports,
                    approvedReports,
                    flaggedReports,
                    speciesData,
                    statusData,
                    dailyReports,
                    violationData,
                    totalViolations,
                    harvestData,
                    totalHarvests,
                    aquacultureOwnerSpeciesData,
                    totalFacilities,
                    fisherfolkAnalytics,
                    totalFisherfolk,
                    postHarvestAnalytics, // Add this
                    totalPostHarvest // Add this
                }
            });
        } catch (error) {
            console.error("❌ Error fetching analytics:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    async renderAdminDashboard(req, res) {
        try {
            const totalReports = await CatchReport.getTotalReports();
            const approvedReports = await CatchReport.getApprovedReports();
            const flaggedReports = await CatchReport.getFlaggedReports();
            const totalViolations = await Violation.getTotalViolations();
            const totalHarvests = await Harvest.getTotalHarvests();
            const totalFacilities = await Aquaculture.getTotalFacilities();
            const totalFisherfolk = await Fisherfolk.getTotalFisherfolk();
            const totalPostHarvest = await PostHarvest.getTotalPostHarvest(); // Add this

            res.render("dashboard-admin", {
                totalReports,
                approvedReports,
                flaggedReports,
                totalViolations,
                totalHarvests,
                totalFacilities,
                totalFisherfolk,
                totalPostHarvest // Add this
            });
        } catch (error) {
            console.error("Error loading admin dashboard:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    async getUserDashboard(req, res) {
        try {
            const userId = req.session.userId;

            if (!userId) {
                return res.status(401).send("Unauthorized: User not logged in");
            }

            const userCatches = await CatchReport.getUserTotalCatches(userId) || 0;
            const userViolations = await Violation.getUserViolations(userId);
            const userHarvests = await Harvest.getHarvestByUser(userId);

            res.render("dashboard-user", {
                userId,
                userCatches,
                userViolations,
                userHarvests
            });
        } catch (error) {
            console.error("Error loading user dashboard:", error);
            res.status(500).send("Internal Server Error");
        }
    }
};


exports.getDashboardData = async (req, res) => {
    try {
        const totalReports = await CatchReport.getTotalReports();
        const approvedReports = await CatchReport.getApprovedReports();
        const flaggedReports = await CatchReport.getFlaggedReports(); 

        console.log("Total Reports:", totalReports);
        console.log("Approved Reports:", approvedReports);
        console.log("Flagged Reports:", flaggedReports); 

        res.render('dashboard-admin', { 
            totalReports,
            approvedReports,
            flaggedReports 
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.getAnalyticsData = async (req, res) => {
    try {
        const totalReports = await CatchReport.getTotalReports();
        const approvedReports = await CatchReport.getApprovedReports();
        const flaggedReports = await CatchReport.getFlaggedReports();
        const speciesData = await CatchReport.getSpeciesData();
        const statusData = await CatchReport.getStatusData();
        const dailyReports = await CatchReport.getDailyReports();

        res.json({
            success: true,  // ✅ Add success field
            data: {
                totalReports,
                approvedReports,
                flaggedReports,
                speciesData,
                statusData,
                dailyReports
            }
        });
    } catch (error) {
        console.error("❌ Error fetching analytics:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
module.exports = DashboardController;
