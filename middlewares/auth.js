const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../errors/custom-error");

const authUser = async (req, res, next) => {
  if (req.user) return next();
  else throw new UnAuthenticatedError("session expired please login again");
};

module.exports = authUser;
