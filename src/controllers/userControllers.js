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
    const { email, password } = req.body;
    const check = checkIfEmpty([email, password]);
    if (check.status) {
      return res.status(400).json({ message: check.msg });
    }
    try {
      const data = await userService.create({
        email: email.trim(),
        password: password.trim(),
      });
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }

  async updateUser(req, res) {
    const { email, password } = req.body;
    const check = checkIfEmpty([email, password]);
    if (check.status) {
      return res.status(400).json({ message: check.msg });
    }
    try {
      const data = await userService.update(
        {
          ...req.body,
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
