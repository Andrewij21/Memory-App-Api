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
module.exports = router;
