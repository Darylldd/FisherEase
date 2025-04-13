// middleware/isAdmin.js
module.exports = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    res.status(403).send('Access denied');
  };
  