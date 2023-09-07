const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const { requestResponse } = require("../utils/requestResponse.js");
const getLogger = require("../utils/logger.js");
const logger = getLogger(__filename);

class refreshTokenServices {
  async refreshToken(refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (!user) return { ...requestResponse.forbidden };

    const token = await jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH_TOKEN
    );

    if (!token || token.email !== user.email)
      return { ...requestResponse.forbidden };

    const roles = Object.values(user.roles).filter(Boolean);
    const accessToken = jwt.sign(
      { email: token.email, roles, user: user._id },
      process.env.SECRET_ACCESS_TOKEN,
      { expiresIn: "10s" }
    );

    logger.info(`refresh token user ${token.email}`);
    return { ...requestResponse.success, data: { accessToken, roles } };
  }
}

module.exports = new refreshTokenServices();
