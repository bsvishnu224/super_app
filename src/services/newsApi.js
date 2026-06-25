import axios from "axios";
const newsClient = axios.create({
  baseURL: "https://newsapi.org/v2",
});

export const fetchTopHeadlines = async (category = "general", apiKey) => {
  try {
    const response = await newsClient.get(`/top-headlines?category=${category}&language=en&apiKey=${apiKey}`);
    return response.data.articles || [];
  } catch (error) {
    console.error("News service failure:", error);
    throw error;
  }
};
