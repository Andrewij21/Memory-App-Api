const authService = require("../services/authServices");
const checkIfEmpty = require("../utils/checkIfEmpty");
const checkResponse = require("../utils/checkResponse");

let response;
class AuthControllers {
  async login(req, res) {
    const { email, password } = req.body;
    const check = checkIfEmpty([email, password]);
    if (check.status) {
      return res.status(400).json({ message: check.msg });
    }
    try {
      const { data, refreshToken } = await authService.create({
        email: email.trim(),
        password: password.trim(),
      });
      response = data;

      // ADD REFRESH TOKEN
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }

  async logout(req, res) {
    try {
      const cookies = req.cookies;
      if (!cookies.jwt) return res.sendStatus(204);
      const data = await authService.delete(cookies.jwt);
      response = data;

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }

  async forgetpassword(req, res) {
    try {
      const data = await authService.forgetPassword(req.body.email);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }
}

module.exports = new AuthControllers();
