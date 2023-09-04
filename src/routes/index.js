const router = require("express").Router();
const albumRoutes = require("./albumRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const refreshTokenRoutes = require("./refreshTokenRoutes");
const verifyJwt = require("../middlewares/verifyJwt");
const verifyRoles = require("../middlewares/verifyRoles");
const ROLES = require("../config/rolesLists");

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.use("/auth", authRoutes);
router.use("/refresh", refreshTokenRoutes);

router.use(verifyJwt);
router.use("/album", verifyRoles(ROLES.User, ROLES.Admin), albumRoutes);
router.use("/user", verifyRoles(ROLES.Admin), userRoutes);
// router.use("/user", userRoutes);

module.exports = router;
