const { searchMovies } = require("../service/movie.service");
const { validate, ValidationError, Joi } = require("express-validation");
const {
  CREATED_HTTP_STATUS_CODE,
  BAD_REQUEST_HTTP_STATUS_CODE,
} = require("../utils/constant");

const searchMovieController = async (req, res, next) => {
  try {
    const { title, limit, offset } = req.body;

    const { movies } = await searchMovies(title, limit, offset);
    res
      .status(CREATED_HTTP_STATUS_CODE)
      .json({ success: true, response: movies });
  } catch (e) {
    // console.error(e);
    return res.status(BAD_REQUEST_HTTP_STATUS_CODE).json({ ...e });
  }
};

module.exports = {
  searchMovieController,
};
