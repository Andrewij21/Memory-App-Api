const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const { roles, email } = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    req.email = email;
    req.roles = roles;
    next();
  } catch (error) {
    res.status(403).json({ error });
  }
};

module.exports = verifyJWT;
