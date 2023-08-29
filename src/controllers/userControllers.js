const userService = require("../services/userServices");
const checkIfEmpty = require("../utils/checkIfEmpty");
const checkResponse = require("../utils/checkResponse");

let response;
class UserControllers {
  async getUser(req, res) {
    try {
      const data = await userService.get();
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }

  async createUser(req, res) {
    const { name, date } = req.body;
    const check = checkIfEmpty([name, date]);
    if (check.status) {
      return res.status(400).json({ message: check.msg });
    }
    try {
      const data = await userService.create({
        ...req.body,
        name: name.trim(),
      });
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }

  async updateUser(req, res) {
    const { name, date } = req.body;
    const check = checkIfEmpty([name, date]);
    if (check.status) {
      return res.status(400).json({ message: check.msg });
    }
    try {
      const data = await userService.update(
        {
          ...req.body,
          name: name.trim(),
        },
        req.params.id
      );
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }
  async deleteUser(req, res) {
    try {
      const data = await userService.delete(req.params.id);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }
}

module.exports = new UserControllers();
