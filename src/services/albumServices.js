const Album = require("../models/albumModel.js");
const isValidId = require("../utils/isValidId.js");
const { requestResponse } = require("../utils/requestResponse.js");
const getLogger = require("../utils/logger.js");
const pagination = require("../utils/pagination.js");
const fs = require("fs");
const logger = getLogger(__filename);

class AlbumServices {
  async get(pageNumber = 1, pageSize = 6) {
    const totalItems = await Album.countDocuments({});
    const totalPages = Math.ceil(totalItems / pageSize);
    // const page = pagination(pageNumber, pageSize, totalItems);
    // if (page.code === 400) throw page;
    const album = await Album.find({})
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize);
    logger.info(`Get ${album.length} photos `);
    return {
      ...requestResponse.success,
      data: album,
      pagination: {
        currentPage: parseInt(pageNumber),
        totalPages,
        pageSize: parseInt(pageSize),
        totalItems: totalItems,
      },
    };
  }
  async getByUserId(pageNumber = 1, pageSize = 6, user) {
    const totalItems = await Album.countDocuments({ user });
    const page = pagination(pageNumber, pageSize, totalItems);
    if (page.code === 400) throw page;
    const album = await Album.find({ user }).skip(page.skip).limit(pageSize);
    logger.info(`Get ${album.length} photos from user ${user} `);
    return {
      ...requestResponse.success,
      data: album,
      pagination: {
        currentPage: parseInt(pageNumber),
        totalPages: page.totalPages,
        pageSize: parseInt(pageSize),
        totalItems: totalItems,
      },
    };
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
