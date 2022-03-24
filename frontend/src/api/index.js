import Fetch from "../utils/helper";

export const handleMovieSearch = async (data) => {
  const url = `http://localhost:4000/api/v1/search/movie`;

  const response = await Fetch.request({
    method: "POST",
    url,
    data,
  });

  const jsonData = await response.json();

  return jsonData;
};
