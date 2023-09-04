const verifyRoles = (...roles) => {
  return (req, res, next) => {
    const userRoles = req.roles;
    if (!userRoles) return res.sendStatus(401);
    const result = userRoles
      .map((role) => roles.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
