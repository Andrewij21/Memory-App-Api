const albumService = require("../services/albumServices");
const checkIfEmpty = require("../utils/checkIfEmpty");
const checkResponse = require("../utils/checkResponse");

let response;
class AlbumControllers {
  async getPhoto(req, res) {
    try {
      const data = await albumService.get();
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }
  async getPhotoByUser(req, res) {
    try {
      const data = await albumService.getByUserId(req.params.id);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }

  async createPhoto(req, res) {
    const { name } = req.body;
    // console.log({ body: req.body, file: req.file });
    try {
      const check = req.status;
      if (!check.status) {
        return res.status(400).json({ message: check.message });
      }
      const data = await albumService.create({
        ...req.body,
        image: req.file.filename,
        name: name.trim(),
      });
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }

  async updatePhoto(req, res) {
    const { name, date } = req.body;
    // console.log({ body: req.body, file: req.file });
    try {
      const check = checkIfEmpty({ name, date });
      if (check.status) {
        return res.status(400).json({ message: check.msg });
      }
      const data = await albumService.update(
        {
          ...req.body,
          name: name.trim(),
        },
        req.params.id,
        req.file
      );
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }
  async deletePhoto(req, res) {
    try {
      const data = await albumService.delete(req.params.id);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }
}

module.exports = new AlbumControllers();
