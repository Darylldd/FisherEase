const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const PostgresStore = require('connect-pg-simple')(session);
const path = require('path');
const flash = require('connect-flash');

const app = express();

// ✅ Use shared db pool for session
const db = require('./models/db');

const fishSpeciesRoutes = require('./routes/fishSpeciesRoutes');
const harvestRoutes = require('./routes/harvest');
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
const climateRoutes = require('./routes/climateRoutes');
const climateLossRoutes = require('./routes/climateLoss');

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Uploads')));
app.use(express.json());

// ✅ Session middleware using shared pg pool
app.use(session({
  store: new PostgresStore({
    pool: db,
    tableName: 'session',
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET || '2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,            // Force disable HTTPS-only cookies
    httpOnly: true,
    sameSite: 'lax',          // Prevent cross-site cookie blocking
    maxAge: 24 * 60 * 60 * 1000
  }
}));


// Attach user info to views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  req.user = req.session.user;
  next();
});

// Flash messages
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Routes
app.get('/', (req, res) => {
  if (req.session.userId) {
    return res.redirect(`/dashboard/${req.session.role}`);
  }
  res.redirect('/auth/login');
});

app.use('/', fishSpeciesRoutes);
app.use('/', climateLossRoutes);
app.use('/climate-analysis', climateRoutes);
app.use('/audit', auditRoutes);
app.use('/landing', landingRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/register', registerRoutes);
app.use('/aquaculture', aquacultureRoutes);
app.use('/', fisherfolkRoutes);
app.use('/catch-report', catchReportRoutes);
app.use('/fishing-activity-tracking', fishingActivityRoutes);
app.use('/', userFishingRoutes);
app.use('/', fishingActivityRoutes);
app.use('/enforcement-compliance-logging', enforcementComplianceRoutes);
app.use('/', violationRoutes);
app.use('/', dashboardRoutes);
app.use('/', analyticsRoutes);
app.use('/harvest', harvestRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on http://0.0.0.0:${PORT}`);
});
