const jwt = require("jsonwebtoken");
const { JWT_Admin_SECRET } = require("../config");

//We can use a single middleware for both admin and user
// function middleware(password){ //We take password because only it differs in both the cases
//   return function(req, res, next){
//     const token = req.headers.token;
//     const decoded = jwt.verify(token, password);

//     if(decoded){
//       req.userId = decoded.id;
//       next();
//     }else{
//       res.status(403).json({
//         message: "You are not authorized to access this.."
//       })
//     }
//   }
// }

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_Admin_SECRET);

  if(decoded){
    req.userId = decoded.id;
    next();
  }else{
    res.status(403).json({
      message: "You are not authorized to access this.."
    })
  }
}

module.exports = { adminMiddleware };