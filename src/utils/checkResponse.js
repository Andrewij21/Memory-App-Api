const getLogger = require("./logger");
const { requestResponse } = require("./requestResponse");

function checkResponse(res, data, filename) {
  const logger = getLogger(filename);
  if (!data.code) {
    logger.error(data.toString());
    return res.status(500).json({
      error: requestResponse.server_error,
    });
  }
  return res.status(data.code).json(data);
}

module.exports = checkResponse;
