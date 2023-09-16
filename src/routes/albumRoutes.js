const router = require("express").Router();
const albumController = require("../controllers/albumControllers");
const upload = require("../middlewares/upload");

router
  .route("/")
  .get(albumController.getPhoto)
  .post(upload.single("image"), albumController.createPhoto);

router
  .route("/:id")
  .patch(upload.single("image"), albumController.updatePhoto)
  .delete(albumController.deletePhoto);

router.route("/user").get(albumController.getPhotoByUser);

module.exports = router;
