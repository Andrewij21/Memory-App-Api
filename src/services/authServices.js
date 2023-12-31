const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const { requestResponse } = require("../utils/requestResponse.js");
const getLogger = require("../utils/logger.js");
const createToken = require("../utils/createToken.js");
const logger = getLogger(__filename);

class AuthServices {
  async create(body) {
    const user = await User.findOne({ email: body.email });
    if (!user) return { data: requestResponse.not_found };

    const match = await bcrypt.compare(body.password, user.password);
    if (!match) return { data: requestResponse.unauthorized };

    const roles = Object.values(user.roles).filter(Boolean);

    const payload = {
      email: user.email,
      roles,
    };

    const token = await createToken(payload);
    user.refreshToken = token.refreshToken;
    await user.save();
    logger.info(`User ${user.email} is login`);
    return {
      refreshToken: token.refreshToken,
      data: {
        ...requestResponse.success,
        data: { accessToken: token.accessToken, roles, user: user._id },
      },
    };
  }

  async delete(refreshToken) {
    const user = await User.findOne({ refreshToken });

    if (!user) return { ...requestResponse.no_content };

    user.refreshToken = "";
    await user.save();

    return { ...requestResponse.no_content };
  }

  async forgetPassword(email) {
    const user = await User.findOne({ email });
    if (!user) throw { ...requestResponse.not_found };

    // If found send password to this email address
    return { ...requestResponse.success };
  }
}

module.exports = new AuthServices();
