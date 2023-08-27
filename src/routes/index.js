const router = require("express").Router();
const albumRoutes = require("./albumRoutes");
router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.use("/album", albumRoutes);

module.exports = router;
