const CatchReport = require("../models/catchReportModel");

const DashboardController = {
    async getAnalyticsData(req, res) {
        try {
            const totalReports = await CatchReport.getTotalReports();
            const approvedReports = await CatchReport.getApprovedReports();
            const flaggedReports = await CatchReport.getFlaggedReports();
            const speciesData = await CatchReport.getSpeciesData();
            const statusData = await CatchReport.getStatusData();
            const dailyReports = await CatchReport.getDailyReports();

            res.json({
                totalReports,
                approvedReports,
                flaggedReports,
                speciesData,
                statusData,
                dailyReports
            });
        } catch (error) {
            console.error("Error fetching analytics data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

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
            console.error("Error loading admin dashboard:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    async getUserDashboard(req, res) {
        try {
            const userId = req.session.userId; // Ensure session contains userId

            if (!userId) {
                return res.status(401).send("Unauthorized: User not logged in");
            }

            // Fetch total fish caught by the user (make sure `getUserTotalCatches` exists in your model)
            const userCatches = await CatchReport.getUserTotalCatches(userId) || 0; 

            res.render("dashboard-user", {
                userId,
                userCatches
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
