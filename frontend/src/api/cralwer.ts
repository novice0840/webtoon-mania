import axios from "axios";

const getAllWebtoon = async () => {
  const response = await axios.get(`/allwebtoon`);
  return response.data;
};

const getWebtoon = async (titleId: string) => {
  const response = await axios.get(`/webtoon/${titleId}`);
  return response.data;
};

const getBestComments = async (titleId: string, chapter: number) => {
  const response = await axios.get(`/bestcomments/${titleId}/${chapter}`);
  return response.data;
};

export { getBestComments, getAllWebtoon, getWebtoon };
