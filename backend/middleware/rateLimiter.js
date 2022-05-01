const rateLimit = require("express-rate-limit");

const movieSearchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  message: {
    success: false,
    message: "You exceeded 1 requests in 1 min limit!",
    response: [],
  },
});

module.exports = {
  movieSearchLimiter,
};
