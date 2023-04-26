const jwt = require("jsonwebtoken");
const userSchema = require("../Module/userModule")
exports.SignInRequired = async (req, res, next) => {
  if (req.headers.authorization) {

    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const user = jwt.verify(token, process.env.JWT_SECRCT_CODE)
    req.user = user;
    console.log(user);
    next();
  }
  else {
    return res.send({ status: 400, error: "Authorization is required!" })
  }
}


exports.useMiddleware = (req, res, next) => {

  next();
}

exports.adminMiddleware = (req, res, next) => {
  console.log(req.user)
  if (req.user.role !== 'admin') {
    return res.send({ message: "admin axios denied" })
  }

  next();
}