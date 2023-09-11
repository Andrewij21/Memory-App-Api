const Album = require("../models/albumModel.js");
const isValidId = require("../utils/isValidId.js");
const { requestResponse } = require("../utils/requestResponse.js");
const getLogger = require("../utils/logger.js");
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
  async update(body, _id) {
    if (!isValidId(_id))
      throw { ...requestResponse.bad_request, message: "Invalid ID" };
    const photo = await Album.findOneAndUpdate(
      { _id },
      { ...body },
      { new: true }
    );

    if (!photo) throw { ...requestResponse.not_found };

    logger.info(`Update photos with ID ${photo._id} `);
    return { ...requestResponse.success, data: photo };
  }
  async delete(_id) {
    if (!isValidId(_id))
      throw { ...requestResponse.bad_request, message: "Invalid ID" };
    const photo = await Album.findOneAndDelete({ _id });

    if (!photo) throw { ...requestResponse.not_found };

    logger.info(`Delete photo with ID ${photo._id} `);
    return { ...requestResponse.success, data: photo };
  }
}

module.exports = new AlbumServices();
