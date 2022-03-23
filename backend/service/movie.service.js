const { query } = require("../models/db");
var axios = require("axios").default;
const config = require("../config/config");

const searchMovies = async (searchKeyword, limit, offset) => {
  const searchMovieQuery = `
  SELECT title, searchKeyword 
  FROM movies
  WHERE searchKeyword = ?
  LIMIT ${limit}
  OFFSET ${offset}
  `;

  const movies = await query(searchMovieQuery, [searchKeyword]);

  if (movies.length === 0) {
    const { movieTitle } = await searchMovieFromApi(searchKeyword);
    if (movieTitle.length === 0) {
      return {
        movies: [],
      };
    }
    const insertToTableQuery = `
    INSERT IGNORE INTO movies (searchKeyword, title)
    VALUES ?
    `;
    const response = await query(insertToTableQuery, [movieTitle]);

    const movies = [];

    movieTitle.map((m) =>
      movies.push({
        title: m[1],
        searchKeyword: m[0],
      })
    );

    return { movies };
  } else {
    return { movies };
  }
};

module.exports = {
  searchMovies,
};

const searchMovieFromApi = async (searchKeyword) => {
  try {
    let page = 1;

    var options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        api_key: config.keys.apiKey,
        query: searchKeyword,
        page: page,
      },
    };

    const movieTitle = [];

    while (true) {
      options.params.page = page;
      const response = await axios.request(options);

      if (response.data.results.length === 0) {
        break;
      }

      response.data.results.forEach((movie) => {
        movieTitle.push([searchKeyword, movie.original_title]);
      });
      page += 1;
    }

    return { movieTitle };
  } catch (err) {
    return { movieTitle: [] };
  }
};
