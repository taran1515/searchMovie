const express = require("express");
const router = express.Router();

const { searchMovieController } = require("../controller/movie.controller.js");

router.route("/search/movie").post(searchMovieController);

module.exports = router;
