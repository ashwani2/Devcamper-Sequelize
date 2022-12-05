const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const db= require("../models/index")
const User = db.users

// Protect Routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }
  // Set token from cookie
    // else if(req.cookies.token){
    //   token=req.cookies.token
    // }

  // Make Sure token exists
  if (!token) {
    return next(new ErrorResponse("Not Authorized to access this Route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Not Authorized to access this Route", 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User Role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
