const logger = require("../logger");

const logResponseTime = (req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const elapsed = process.hrtime(start);
    const elapsedMs = elapsed[0] * 1000 + elapsed[1] / 1e6;

    logger.warn(
      `[${req.method}] - ${res.statusCode} | ${elapsedMs.toFixed(2)} ms - ${
        req.originalUrl
      }`
    );
  });

  next();
};

module.exports = logResponseTime;
