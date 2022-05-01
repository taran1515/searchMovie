const { searchMovies } = require("../service/movie.service");
const {
  CREATED_HTTP_STATUS_CODE,
  BAD_REQUEST_HTTP_STATUS_CODE,
} = require("../utils/constant");

const searchMovieController = async (req, res, next) => {
  try {
    const { searchKeyword, limit, offset } = req.body;

    const { movies } = await searchMovies(searchKeyword, limit, offset);
    res
      .status(CREATED_HTTP_STATUS_CODE)
      .json({ success: true, response: movies });
  } catch (e) {
    return res.status(BAD_REQUEST_HTTP_STATUS_CODE).json({
      success: false,
      response: [],
      message: "Something unexpected happened!",
    });
  }
};

module.exports = {
  searchMovieController,
};
