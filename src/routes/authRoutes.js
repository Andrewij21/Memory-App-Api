const router = require("express").Router();
const authController = require("../controllers/authControllers");

router.route("/").post(authController.login);
router.route("/logout").delete(authController.logout);
router.route("/forget-password").delete(authController.logout);

module.exports = router;
