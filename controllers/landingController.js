// controllers/landingController.js
exports.getLandingPage = (req, res) => {
    res.render('landing', { title: 'FisherEase Landing Page' });
};
