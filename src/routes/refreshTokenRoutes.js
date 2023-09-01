const router = require("express").Router();
const refreshTokenControllers = require("../controllers/refreshTokenControllers");

router.route("/").get(refreshTokenControllers.refreshToken);

module.exports = router;
