const router = require("express").Router();
const albumRoutes = require("./albumRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const refreshTokenRoutes = require("./refreshTokenRoutes");
router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.use("/auth", authRoutes);
router.use("/album", albumRoutes);
router.use("/user", userRoutes);
router.use("/refresh", refreshTokenRoutes);

module.exports = router;
