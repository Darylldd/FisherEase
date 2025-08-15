const PostHarvest = require('../models/postHarvest');

exports.getRegisterForm = (req, res) => {
    res.render('post_harvest_registration', { title: 'Post-Harvest Registration', error: null });
};

exports.registerPostHarvest = async (req, res) => {
    try {
        await PostHarvest.create(req.body);
        res.redirect('/register/post-harvest?success=true');
    } catch (error) {
        res.render('post_harvest_registration', {
            title: 'Post-Harvest Registration',
            error: error.message
        });
    }
};

exports.getAdminTable = async (req, res) => {
    if (!req.session.role || req.session.role !== 'admin') {
        return res.status(403).send('Access denied. Admin only.');
    }
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const { rows, total, page: currentPage } = await PostHarvest.getAll(page, limit);
        const totalPages = Math.ceil(total / limit);
        res.render('post_harvest_admin', {
            title: 'Post-Harvest Records',
            records: rows,
            currentPage,
            totalPages,
            error: null
        });
    } catch (error) {
        res.render('post_harvest_admin', {
            title: 'Post-Harvest Records',
            records: [],
            currentPage: 1,
            totalPages: 0,
            error: error.message
        });
    }
};