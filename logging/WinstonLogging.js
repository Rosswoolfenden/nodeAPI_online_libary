// import logging and use logging.createLogger(name) and then log.info, .debug...
const winston = require("winston");
const config = require("../config");

// Only the first logger should handle exceptions
let unhandledExceptions = true;
const { combine, timestamp, label, printf, colorize } = winston.format;

let handleExceptions = false;

const logFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

module.exports = {
  createLogger: function(logLabel) {
    const log = winston.createLogger({
        format: combine(
          colorize(),
          label({ label: logLabel}),
          timestamp(),
          logFormat
        ),
        level: config.logLevel,
        silent: config.unitTesting,
        transports: [new winston.transports.Console({ handleExceptions: handleExceptions })]
      });

    // Only the first logger needs to catch unhandled exceptions
    unhandledExceptions = false;

    return log;
  }
}

module.exports.createLogger("base");
