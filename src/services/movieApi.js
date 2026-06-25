import axios from "axios";
const movieClient = axios.create({
  baseURL: "https://www.omdbapi.com/",
});

export const searchMovieByGenre = async (query, apiKey) => {
  try {
    const response = await movieClient.get(`/?s=${encodeURIComponent(query)}&type=movie&apikey=${apiKey}`);
    return response.data.Search || [];
  } catch (error) {
    console.error("Movie query service failure:", error);
    throw error;
  }
};

// Detailed Movie Fetcher Method
export const fetchMovieDetails = async (imdbID, apiKey) => {
  try {
    const response = await movieClient.get(`/?i=${imdbID}&plot=full&apikey=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error("Movie detail payload query error:", error);
    throw error;
  }
};