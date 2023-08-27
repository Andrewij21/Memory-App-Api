const winston = require("winston");
const { printf, combine, json, timestamp, errors, label } = winston.format;
const path = require("path");

const customFormat = printf(({ timestamp, level, message, stack, label }) => {
  if (message.constructor === "object") message = JSON.stringify(message);
  return `[${timestamp}] [${label}] [${level.toUpperCase()}] : ${
    stack || message
  }`;
});

function getLogger(callingModuleFilename) {
  const callerFilename = path.basename(callingModuleFilename);

  return winston.createLogger({
    level: "http",
    format: combine(
      label({ label: callerFilename }),
      timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
      errors(),
      customFormat
    ),
    transports: [new winston.transports.Console()],
  });
}

module.exports = getLogger;
