import axios from "axios";

const BaseURL = `https://${process.env.REACT_APP_ENV_BACKEND_IP}:3000`;

const getAllWebtoon = async () => {
  const response = await axios.get(`${BaseURL}/allwebtoon`);
  return response.data;
};

const getWebtoon = async (titleId: string) => {
  const response = await axios.get(`${BaseURL}/webtoon/${titleId}`);
  return response.data;
};

const getBestComments = async (titleId: string, chapter: number) => {
  const response = await axios.get(`${BaseURL}/bestcomments/${titleId}/${chapter}`);
  return response.data;
};

export { getBestComments, getAllWebtoon, getWebtoon };
