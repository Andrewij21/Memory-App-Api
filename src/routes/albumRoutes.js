const router = require("express").Router();
const albumController = require("../controllers/albumControllers");

router
  .route("/")
  .get(albumController.getPhoto)
  .post(albumController.createPhoto);

router
  .route("/:id")
  .patch(albumController.updatePhoto)
  .delete(albumController.deletePhoto);

router.route("/user/:id").get(albumController.getPhotoByUser);

module.exports = router;
