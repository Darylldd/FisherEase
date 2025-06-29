const CatchReport = require("../models/catchReportModel");

const DashboardController = {
    // For API-style JSON analytics (used by frontend charts, etc.)
    async getAnalyticsData(req, res) {
        try {
            const totalReports = await CatchReport.getTotalReports();
            const approvedReports = await CatchReport.getApprovedReports();
            const flaggedReports = await CatchReport.getFlaggedReports();
            const speciesData = await CatchReport.getSpeciesData();
            const statusData = await CatchReport.getStatusData();
            const dailyReports = await CatchReport.getDailyReports();

            res.json({
                success: true,
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
            console.error("❌ Error fetching analytics data:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    // For rendering Admin Dashboard View
    async renderAdminDashboard(req, res) {
        try {
            const totalReports = await CatchReport.getTotalReports();
            const approvedReports = await CatchReport.getApprovedReports();
            const flaggedReports = await CatchReport.getFlaggedReports();

            res.render("dashboard-admin", {
                totalReports,
                approvedReports,
                flaggedReports
            });
        } catch (error) {
            console.error("❌ Error loading admin dashboard:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    // For rendering User Dashboard View
    async getUserDashboard(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).send("Unauthorized: User not logged in");
            }

            const userCatches = await CatchReport.getUserTotalCatches(userId) || 0;

            res.render("dashboard-user", {
                userId,
                userCatches
            });
        } catch (error) {
            console.error("❌ Error loading user dashboard:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    // For traditional route `/dashboard/admin` if using EJS or similar templating
    async getDashboardData(req, res) {
        try {
            const totalReports = await CatchReport.getTotalReports();
            const approvedReports = await CatchReport.getApprovedReports();
            const flaggedReports = await CatchReport.getFlaggedReports();

            console.log("📊 Dashboard Stats:", {
                totalReports,
                approvedReports,
                flaggedReports
            });

            res.render('dashboard-admin', {
                totalReports,
                approvedReports,
                flaggedReports
            });
        } catch (error) {
            console.error("❌ Error fetching dashboard data:", error);
            res.status(500).send("Internal Server Error");
        }
    }
};

module.exports = DashboardController;
