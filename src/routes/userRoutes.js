const router = require("express").Router();
const userController = require("../controllers/userControllers");

router.route("/").get(userController.getUser).post(userController.createUser);

router
  .route("/:id")
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
