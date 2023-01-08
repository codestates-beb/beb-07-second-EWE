const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    console.log(req.decoded);
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(419).json({
        message: 'token expired, please login again',
      });
    }
    return res.status(401).json({
      message: 'Invalid Token',
    });
  }
};

module.exports = { verifyToken };
