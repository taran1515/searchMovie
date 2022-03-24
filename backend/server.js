const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const rateLimit = require("express-rate-limit");

const router = require("./routes/index.route");
const { movieSearchLimiter } = require("./middleware/rateLimiter");

dotenv.config();

const app = express();

app.use(cors());

const port = process.env.PORT;

app.use(express.json());

app.use(movieSearchLimiter);

app.use("/api/v1/search", movieSearchLimiter);

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
