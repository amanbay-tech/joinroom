require("dotenv").config();
const express = require("express");
const logger = require("./app/logger");
const logResponseTime = require("./app/middleware/responseTime");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logResponseTime);

app.use(require("./routes"));

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "localhost";

app
  .listen(PORT, async () => {
    logger.info(`Server is running on http://${HOST}:${PORT}`);
  })
  .on("error", async (err) => {
    logger.error(
      `An error was encountered during server startup.\n\t\t${err.stack}`
    );
  });
