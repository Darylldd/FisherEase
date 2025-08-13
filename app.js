const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require("path");
const flash = require('connect-flash');
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // Store files in "uploads/" directory
const app = express();

const admeasurementRoutes = require('./routes/admeasurementRoutes');
const fishingVesselRoutes = require('./routes/fishingVesselRoutes');
const fishSpeciesRoutes = require('./routes/fishSpeciesRoutes');
const harvestRoutes = require("./routes/harvest");
const landingRoutes = require('./routes/landingRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboard');
const registerRoutes = require('./routes/register'); 
const aquacultureRoutes = require('./routes/aquacultureRoutes');
const fisherfolkRoutes = require('./routes/fisherfolkRoutes');
const catchReportRoutes = require('./routes/catchReportRoutes');
const fishingActivityRoutes = require('./routes/fishingActivityRoutes');
const userFishingRoutes = require('./routes/userFishingRoutes');
const enforcementComplianceRoutes = require('./routes/enforcementComplianceRoutes');
const violationRoutes = require('./routes/violationRoutes');
const analyticsRoutes = require('./routes/analytics'); 
const auditRoutes = require('./routes/auditRoutes');

const climateLossRoutes = require("./routes/climateLoss");
// Session middleware
app.use(session({
    secret: "2025",
    resave: false,
    saveUninitialized: false, // Changed to false for security
    cookie: { secure: false } // Set secure: true for HTTPS in production
}));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Serve static files
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Flash messages
app.use(flash());

// Make user and flash messages available in templates
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

app.use((req, res, next) => {
  res.locals.user = req.session.user || req.user || { name: 'Admin' };
  next();
});


// Routes
app.get("/", (req, res) => {
    if (req.session.userId) {
        return res.redirect(`/dashboard/${req.session.role}`);
    }
    res.redirect("/auth/login");
});
  app.use('/', admeasurementRoutes);
app.use('/', fishingVesselRoutes);
  app.use('/', fishSpeciesRoutes);
app.use("/climateLoss", climateLossRoutes);
app.use('/audit', auditRoutes);  
app.use('/landing', landingRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/register', registerRoutes);  // For handling registration routes (including fisherfolk, aquaculture)
app.use('/aquaculture', aquacultureRoutes);  // Only the aquaculture-specific routes
app.use('/', fisherfolkRoutes);
app.use('/catch-report', catchReportRoutes);
app.use('/fishing-activity-tracking', fishingActivityRoutes);
app.use('/', userFishingRoutes); // User Routes
app.use('/', fishingActivityRoutes); // Admin Routes
app.use('/enforcement-compliance-logging', enforcementComplianceRoutes);
app.use( violationRoutes);
app.use('/', dashboardRoutes);
app.use('/', analyticsRoutes);
app.use("/harvest", harvestRoutes);



//const PORT = process.env.PORT || 3000;
//app.listen(PORT, '0.0.0.0', () => {
  //console.log(`Server started on http://0.0.0.0:${PORT}`);
//});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
