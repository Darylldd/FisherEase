// controllers/landingController.js
exports.getLandingPage = (req, res) => {
    res.render('landing', { title: 'FMO Landing Page' });
};
