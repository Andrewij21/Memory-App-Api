const router = require("express").Router();
const albumRoutes = require("./albumRoutes");
const userRoutes = require("./userRoutes");
router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.use("/album", albumRoutes);
router.use("/user", userRoutes);

module.exports = router;
