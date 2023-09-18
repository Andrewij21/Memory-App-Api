const allowedOrigins = require("./allowedOrigins");
const getLogger = require("../utils/logger");
const logger = getLogger(__filename);

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      logger.info(`Access granted for origin ${origin}`);
      callback(null, true);
    } else {
      logger.error(`Access denied for origin ${origin}`);
      callback(null, false);
    }
  },
  optionSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
