const refreshTokenService = require("../services/refreshTokenServices");

const checkResponse = require("../utils/checkResponse");

let response;
class refreshTokenControllers {
  async refreshToken(req, res) {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.status(401).json({ message: "Null token" });

    try {
      const data = await refreshTokenService.refreshToken(cookies.jwt);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }
}

module.exports = new refreshTokenControllers();
