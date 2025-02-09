const jwt = require('jsonwebtoken');
const { JWT_Admin_SECRET } = require("../config");

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_Admin_SECRET);

  if(decoded){
    req.userId = decoded.indexOf;
    next();
  }else{
    res.status(403).json({
      message: "You are not authorized to access this.."
    })
  }
}

module.exports = adminMiddleware;