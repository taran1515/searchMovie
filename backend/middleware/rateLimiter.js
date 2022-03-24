const rateLimit = require("express-rate-limit");

const movieSearchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
  message: {
    success: false,
    message: "You exceeded 1 requests in 1 hour limit!",
    response: [],
  },
});

module.exports = {
  movieSearchLimiter,
};
