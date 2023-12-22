const jwt = require("jsonwebtoken");
const getLogger = require("../utils/logger");
const logger = getLogger(__filename);

const createToken = async (payload) => {
  try {
    const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(
      { email: payload.email },
      process.env.SECRET_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    logger.error(error.toString());
  }
};

module.exports = createToken;
