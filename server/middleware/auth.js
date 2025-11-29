const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
