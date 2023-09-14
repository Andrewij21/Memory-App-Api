require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/mongoDB");
const routes = require("./routes");
const getLogger = require("./utils/logger");
const corsOptions = require("./config/corsOptions");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = getLogger(__filename);

// Static files
app.use(express.static("public"));

// Accept JSON
app.use(express.json());

// Accept cookies
app.use(cookieParser());

// Cors
app.use(cors(corsOptions));

// Api logger
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: { write: (message) => logger.http(message) },
  })
);

// All routes
app.use(routes);

// DB conecction
connectDB
  .then(() => {
    app.listen(PORT, () =>
      logger.info(`Server running in ${NODE_ENV} on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    logger.error(err.toString());
  });
