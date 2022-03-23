const { query } = require("../models/db");

const searchMovies = async (title, limit, offset) => {
  const searchMovieQuery = `
  SELECT id, title 
  FROM movies
  WHERE title = ?
  LIMIT ${limit}
  OFFSET ${offset}
  `;

  const movies = await query(searchMovieQuery, [title]);

  if (movies.length === 0) {
    return { movies: {} };
  } else {
    return { movies };
  }
};

module.exports = {
  searchMovies,
};
