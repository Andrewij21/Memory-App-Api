const Album = require("../models/albumModel.js");
const isValidId = require("../utils/isValidId.js");
const { requestResponse } = require("../utils/requestResponse.js");
const getLogger = require("../utils/logger.js");
const fs = require("fs");
const logger = getLogger(__filename);

class AlbumServices {
  async get() {
    const album = await Album.find({});
    logger.info(`Get ${album.length} photos `);
    return { ...requestResponse.success, data: album };
  }
  async getByUserId(user) {
    const album = await Album.find({ user });
    logger.info(`Get ${album.length} photos from user ${user} `);
    return { ...requestResponse.success, data: album };
  }
  async create(body) {
    if (!isValidId(body.user))
      throw { ...requestResponse.bad_request, message: "Invalid ID" };
    const result = await Album.create(body);
    logger.info(`Create photo with ID ${result._id}  `);
    return { ...requestResponse.created, data: result };
  }
  async update(body, _id, file) {
    if (!isValidId(_id))
      throw { ...requestResponse.bad_request, message: "Invalid ID" };

    const existingPhoto = await Album.findOne({ _id });
    if (!existingPhoto) throw { ...requestResponse.not_found };

    if (file) {
      const imagePath = `public/images/${existingPhoto.image}`;
      if (fs.existsSync(imagePath)) {
        logger.info(`Image ${existingPhoto.image} is deleted `);
        fs.unlinkSync(imagePath);
      }
    }

    const updatedPhoto = await Album.findOneAndUpdate(
      { _id },
      { ...body, image: file?.filename },
      { new: true }
    );
    if (!updatedPhoto) throw { ...requestResponse.not_found };
    // console.log({ body, file });

    logger.info(`Update photos with ID ${updatedPhoto._id} `);
    return { ...requestResponse.success, data: updatedPhoto };
  }
  async delete(_id) {
    if (!isValidId(_id))
      throw { ...requestResponse.bad_request, message: "Invalid ID" };

    const photo = await Album.findOneAndDelete({ _id });

    if (!photo) throw { ...requestResponse.not_found };

    const imagePath = `public/images/${photo.image}`;
    if (fs.existsSync(imagePath)) {
      logger.info(`Image ${photo.image} is deleted `);
      fs.unlinkSync(imagePath);
    }

    logger.info(`Delete photo with ID ${photo._id} `);
    return { ...requestResponse.success, data: photo };
    // return { ...requestResponse.success, data: photo };
  }
}

module.exports = new AlbumServices();
