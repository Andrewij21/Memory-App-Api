const Album = require("../models/albumModel.js");
const isValidId = require("../utils/isValidId.js");
const { requestResponse } = require("../utils/requestResponse.js");

class AlbumServices {
  async get() {
    const album = await Album.find({});
    return { ...requestResponse.success, data: album };
  }
  async create(body) {
    const result = await Album.create(body);
    return { ...requestResponse.created, data: result };
  }
  async update(body, id) {
    if (!isValidId(id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const photo = await Album.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );

    if (!photo) throw { ...requestResponse.not_found };

    return { ...requestResponse.success, data: photo };
  }
}

module.exports = new AlbumServices();
